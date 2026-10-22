import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useAuthStore } from "../features/auth/authStore";
import { loginSchema, type LoginValues } from "../features/auth/schemas";
import { loginUser } from "../lib/api/auth";
import { fetchCurrentUser } from "../lib/api/users";

export const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();
  const setSession = useAuthStore((state) => state.setSession);
  const from =
    location.state &&
    typeof location.state === "object" &&
    "from" in location.state &&
    typeof location.state.from === "string"
      ? location.state.from
      : "/";

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: "", password: "" },
  });

  const mutation = useMutation({
    mutationFn: ({ username, password }: LoginValues) => loginUser(username, password),
    onSuccess: async ({ access_token }) => {
      setSession(access_token, null);
      const user = await fetchCurrentUser();
      setSession(access_token, user);
      await queryClient.invalidateQueries({ queryKey: ["current-user"] });
      navigate(from, { replace: true });
    },
  });

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-6 text-2xl font-bold">Log in</h1>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      >
        <div>
          <label className="mb-1 block text-sm" htmlFor="username">
            Username
          </label>
          <Input id="username" autoComplete="username" {...form.register("username")} />
          {form.formState.errors.username ? (
            <p className="mt-1 text-sm text-destructive">
              {form.formState.errors.username.message}
            </p>
          ) : null}
        </div>
        <div>
          <label className="mb-1 block text-sm" htmlFor="password">
            Password
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            {...form.register("password")}
          />
          {form.formState.errors.password ? (
            <p className="mt-1 text-sm text-destructive">
              {form.formState.errors.password.message}
            </p>
          ) : null}
        </div>
        {mutation.isError ? (
          <p className="text-sm text-destructive">
            {mutation.error instanceof Error
              ? mutation.error.message
              : "Failed to authenticate"}
          </p>
        ) : null}
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <p className="mt-6 text-sm text-muted-foreground">
        No account?{" "}
        <Link className="underline" to="/register">
          Register
        </Link>
      </p>
    </section>
  );
};
