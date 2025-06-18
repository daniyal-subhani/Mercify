import z from "zod";


const password = z.string().min(6, "Password must be at least 6 characters").max(20, "Password must not exceed 20 characters");
const name = z.string().min(3, "Name must be at least 3 characters").max(20, "Name must not exceed 20 characters");
const email = z.string().email("Invalid email address");
const role = z.enum(["user", "seller"]);
const bio = z.string().max(101, "Bio must be under 101 characters").optional();
const avatar = z.string().url("Avatar must be a valid URL").optional();

// Schemas
export const basicUserSchema = z.object({
  name,
  email,
  password,
  role: role.optional(),
  bio,
  avatar,
});

export const updateUserSchema = z.object({
  name: name.optional(),
  email: email.optional(),
  password: password.optional(),
  role: role.optional(),
  bio,
  avatar,
});

