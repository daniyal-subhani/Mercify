import Order from "../models/order.model";
import { successResponse } from "../utils/responseHandler";
import { createOrderSchema } from "../validators/order.validator";


export const createOrder = async (req, res) => {
  try {
    const validatedOrder = createOrderSchema.parse(req.body);
    const userId = req.user._id;
    const newOrder = await Order.create(
      {
        ...validatedOrder,
        user: userId,
      }
    )
    return successResponse(res, 201,  "Order created successfully", newOrder);
  } catch (error) {
    if (error.name === "ZodError") {
      const firstError = error.errors[0]?.message || "Invalid input";
      return errorResponse(res, 400, firstError);
    }
    return errorResponse(res, 500, error.message);
  }
};