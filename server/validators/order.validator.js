import { z } from "zod";

const objectRegex = /^[a-zA-Z0-9\s]*$/;
export const deliveryInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  street: z.string().min(1, "Street is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(4, "Zipcode is required"),
  country: z.string().min(1, "Country is required"),
});

export const orderItemSchema = z.object({
  productId: z.string().regex(objectRegex, "Invalid Product ID"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
});

export const createOrderSchema = z
  .object({
    deliveryInfo: deliveryInfoSchema,
    orderItems: z
      .array(orderItemSchema)
      .min(1, "At least one product is required"),
    subtotal: z.number().min(0, "Subtotal must be a positive number"),
    tax: z.number().min(0, "Tax must be a positive number"),
    shipping: z.number().min(0, "Shipping must be a positive number"),
    total: z.number().min(0, "Total must be a positive number"),
    paymentMethod: z.enum(["cash-on-delivery", "stripe"]),
  })
  .refine(
    (data) =>
      data.total ===
      ((data.subtotal + data.tax + data.shipping).toFixed(2),
      {
        message: "Total should equal subtotal + tax + shipping",
        path: ["total"],
      })
  );
