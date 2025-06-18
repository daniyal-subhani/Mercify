import { z } from "zod";

// ✅ Base fields for any user
const BaseUserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

// ✅ Signup extends base + password
export const signupSchema = BaseUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Login only needs email and password
export const loginSchema = z.object({
  email: BaseUserSchema.shape.email,
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// ✅ Profile update uses base + bio + avatar
export const updateProfileSchema = BaseUserSchema.extend({
  bio: z.string().max(160, "Bio can't exceed 160 characters").optional(),
  avatar: z
    .string()
    .url("Must be a valid image URL")
    .nullable()
    .optional(),
});
// // ✅ Password update uses base + password
// export const updatePasswordSchema = BaseUserSchema.extend({
//   password: z.string().min(6, "Password must be at least 6 characters"),
// });