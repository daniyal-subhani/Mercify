import { z } from "zod";

const objectId = z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ID format");

export const createProductSchema = z
  .object({
    productName: z.string().min(3, "Product name is required").max(50),
    productDescription: z.string().min(10, "Description too short").max(500),
    price: z.coerce.number().min(0, "Price must be positive"),         // 👈 fix here
    offerPrice: z.coerce.number().min(0, "Offer price must be positive"), // 👈 fix here
    category: objectId,
    subCategory: objectId,
    sizes: z.array(objectId).min(1, "At least one size is required"),
    stock: z.coerce.number().min(0, "Stock cannot be negative"),       // 👈 and here
  })
  .refine((data) => data.offerPrice <= data.price, {
    message: "Offer price must be less than or equal to price",
    path: ["offerPrice"],
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
