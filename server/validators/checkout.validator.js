import z from "zod";

export const checkOutSchema = z.object({
  shippingInfo: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number is required"),
    street: z.string().min(1, "Street is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(4, "Zipcode is required"),
    country: z.string().min(1, "Country is required"),
  }),
  cartItems: z.array(
    z.object({
      productId: z.string().regex(/^[a-zA-Z0-9\s]*$/, "Invalid Product ID"),
      quantity: z.number().min(1, "Quantity must be at least 1"),
    })
  ), 
  cartTotal: z.object({
    subtotal: z.number().min(0, "Subtotal must be a positive number"),
    tax: z.number().min(0, "Tax must be a positive number"),
    shipping: z.number().min(0, "Shipping must be a positive number"),
    total: z.number().min(0, "Total must be a positive number"),
  }),
  paymentMethod: z.enum(["COD", "stripe"]),

});
