import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  changePasswordSchema,
  type ChangePasswordValues,
} from "../features/auth/schemas";
import { changePassword, fetchCurrentUser } from "../lib/api/users";
import { ApiError } from "../lib/api/client";

export const Profile = () => {
  const userQuery = useQuery({
    queryKey: ["current-user"],
    queryFn: fetchCurrentUser,
  });

  const form = useForm<ChangePasswordValues>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { current_password: "", new_password: "" },
  });

  const mutation = useMutation({
    mutationFn: changePassword,
    onSuccess: () => form.reset(),
  });

  const user = userQuery.data;

  return (
    <section className="mx-auto max-w-lg px-4 py-12">
      <h1 className="mb-6 text-2xl font-bold">Profile</h1>
      {userQuery.isPending ? (
        <p className="text-muted-foreground">Loading profile...</p>
      ) : userQuery.isError ? (
        <p className="text-sm text-destructive">
          {userQuery.error instanceof ApiError
            ? userQuery.error.detail
            : "Could not load profile."}
        </p>
      ) : user ? (
        <dl className="mb-10 space-y-2 text-sm">
          <div>
            <dt className="text-muted-foreground">Username</dt>
            <dd className="font-medium">{user.username}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="font-medium">{user.email}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Name</dt>
            <dd className="font-medium">
              {user.first_name} {user.last_name}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Role</dt>
            <dd className="font-medium">{user.role}</dd>
          </div>
        </dl>
      ) : null}

      <h2 className="mb-4 text-xl font-semibold">Change password</h2>
      <form
        className="space-y-4"
        onSubmit={form.handleSubmit((values) => mutation.mutate(values))}
      >
        <div>
          <label className="mb-1 block text-sm" htmlFor="current_password">
            Current password
          </label>
          <Input
            id="current_password"
            type="password"
            autoComplete="current-password"
            {...form.register("current_password")}
          />
        </div>
        <div>
          <label className="mb-1 block text-sm" htmlFor="new_password">
            New password
          </label>
          <Input
            id="new_password"
            type="password"
            autoComplete="new-password"
            {...form.register("new_password")}
          />
          {form.formState.errors.new_password ? (
            <p className="mt-1 text-sm text-destructive">
              {form.formState.errors.new_password.message}
            </p>
          ) : null}
        </div>
        {mutation.isSuccess ? (
          <p className="text-sm text-muted-foreground">Password updated.</p>
        ) : null}
        {mutation.isError ? (
          <p className="text-sm text-destructive">
            {mutation.error instanceof ApiError
              ? mutation.error.detail
              : "Could not change password."}
          </p>
        ) : null}
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Update password"}
        </Button>
      </form>
    </section>
  );
};
