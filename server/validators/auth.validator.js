import { z } from "zod";

// Common field validations
const password = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .max(20, "Password must not exceed 20 characters");

const name = z
  .string()
  .min(3, "Name must be at least 3 characters")
  .max(20, "Name must not exceed 20 characters");

const email = z.string().email("Invalid email address");

const role = z.enum(["user", "seller"]).default("user");

const avatar = z
  .string()
  .url("Avatar must be a valid URL")
  .optional();

const bio = z
  .string()
  .max(100, "Bio must not exceed 100 characters")
  .optional();

// 👤 Login Schema
export const loginSchema = z.object({
  email,
  password,
});

// 📝 Register Schema
export const registerSchema = z.object({
  name,
  email,
  password,
  role,
  avatar,
  bio,
});
