import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

export const registerSchema = z.object({
  username: z.string().trim().min(2),
  email: z.string().trim().email(),
  first_name: z.string().trim().min(1),
  last_name: z.string().trim().min(1),
  password: z.string().min(8),
  role: z.enum(["user", "admin"]),
});

export const changePasswordSchema = z
  .object({
    current_password: z.string().min(1),
    new_password: z.string().min(8),
  })
  .refine((value) => value.current_password !== value.new_password, {
    message: "New password must differ from current password",
    path: ["new_password"],
  });

export const blogFormSchema = z.object({
  title: z.string().trim().min(3),
  description: z.string().trim().min(1).max(100),
  content: z.string().trim().min(1),
  category: z.string().trim().min(1),
});

export type LoginValues = z.infer<typeof loginSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;
export type ChangePasswordValues = z.infer<typeof changePasswordSchema>;
export type BlogFormValues = z.infer<typeof blogFormSchema>;
