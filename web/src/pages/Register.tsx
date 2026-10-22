import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { registerSchema, type RegisterValues } from "../features/auth/schemas";
import { registerUser } from "../lib/api/auth";
import { ApiError } from "../lib/api/client";

export const Register = () => {
  const navigate = useNavigate();
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      role: "user",
    },
  });

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: () => navigate("/login"),
  });

  return (
    <section className="mx-auto max-w-md px-4 py-16">
      <h1 className="mb-6 text-2xl font-bold">Create an account</h1>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      >
        {(
          [
            ["username", "Username"],
            ["email", "Email"],
            ["first_name", "First name"],
            ["last_name", "Last name"],
            ["password", "Password"],
          ] as const
        ).map(([name, label]) => (
          <div key={name}>
            <label className="mb-1 block text-sm" htmlFor={name}>
              {label}
            </label>
            <Input
              id={name}
              type={name === "password" ? "password" : name === "email" ? "email" : "text"}
              {...form.register(name)}
            />
            {form.formState.errors[name] ? (
              <p className="mt-1 text-sm text-destructive">
                {form.formState.errors[name]?.message}
              </p>
            ) : null}
          </div>
        ))}
        <div>
          <label className="mb-1 block text-sm" htmlFor="role">
            Role
          </label>
          <select
            id="role"
            className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm"
            {...form.register("role")}
          >
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>
        {mutation.isError ? (
          <p className="text-sm text-destructive">
            {mutation.error instanceof ApiError
              ? mutation.error.detail
              : "Could not register"}
          </p>
        ) : null}
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Register"}
        </Button>
      </form>
      <p className="mt-6 text-sm text-muted-foreground">
        Already registered?{" "}
        <Link className="underline" to="/login">
          Log in
        </Link>
      </p>
    </section>
  );
};
