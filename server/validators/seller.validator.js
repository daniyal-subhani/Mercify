import { z } from "zod";

export const sellerSchema = z.object({
  shopName: z.string().min(2, "Shop name is required"),
  businessEmail: z.string().email("Invalid email").optional(),
  businessAddress: z.string().min(5, "Business address is required").max(255),
  GSTNumber: z.string().optional(),
  avatar: z.string().optional(), 
});

export const sellerAuthSchema = z.object({
  shopName: z.string().min(2, "Shop name must be at least 2 characters"),
  GSTNumber: z.string().min(5, "GST Number is required"),
  businessAddress: z
    .string()
    .min(5, "Business address must be at least 5 characters")
    .max(255, "Business address too long"),
});
