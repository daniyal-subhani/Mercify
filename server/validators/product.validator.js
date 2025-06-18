import { z } from "zod";

export const createProductSchema = z.object({
  productName: z.string().min(3, "Product name is required").max(50),
  productDescription: z.string().min(10, "Description too short").max(500),
  price: z.number().min(0, "Price must be positive"),
  offerPrice: z.number().min(0, "Offer price must be positive"),
  category: z.string().min(3).max(50),
  subCategory: z.string().min(3).max(50),
  sizes: z.array(z.string().min(1)).min(1, "At least one size is required"),
  stock: z.number().min(0, "Stock cannot be negative"),
  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .min(1, "At least one image is required")
    .max(5, "Maximum 5 images allowed"),
});

export const updateProductSchema = z.object({
  productName: z.string().min(3).max(50).optional(),
  productDescription: z.string().min(10).max(500).optional(),
  price: z.number().min(0).optional(),
  offerPrice: z.number().min(0).optional(),
  category: z.string().min(3).max(50).optional(),
  subCategory: z.string().min(3).max(50).optional(),
  sizes: z.array(z.string().min(1)).min(1).max(10).optional(),
  stock: z.number().min(0).optional(),
  images: z
    .array(z.string().url("Each image must be a valid URL"))
    .min(1)
    .max(5)
    .optional(),
});
