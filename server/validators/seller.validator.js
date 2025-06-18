import { z } from "zod";

export const sellerSchema = z.object({
  shopName: z.string().min(2, "Shop name is required"),
  businessEmail: z.string().email("Invalid email"),
  phone: z.string().min(6, "Phone number is required"),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
    country: z.string(),
  }),
  gstNumber: z.string().optional(),
  avatar: z.string().optional(), 
});
