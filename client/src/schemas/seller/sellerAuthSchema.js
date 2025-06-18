import z from "zod";

export const sellerAuthSchema = z.object({
  shopName: z.string().min(1, "Shop name is required"),
  GSTNumber: z.string().min(1, "GST/VST number is required"),
  businessAddress: z.string().min(1, "Business address is required"),
});