import Order from "../models/order.model.js";
import { successResponse } from "../utils/responseHandler.js";
import Product from "../models/product.model.js";
import { calculateCartTotals } from "../utils/calculateCartTotals.js";

export const createOrder = async (req, res) => {
  try {
    const { deliveryInfo, cartTotal, cartItems, paymentMethod } = req.validated;
    const userId = req.user._id;

    const productIds = cartItems.map((item) => item.productId);
    const fetchProductsFromDB = await Product.find({
      _id: { $in: productIds },
    }).populate("seller", "_id name email");
    if (fetchProductsFromDB.length !== cartItems.length) {
      return errorResponse(res, 400, "Invalid product ID");
    }

    const {
      tax,
      shipping,
      subTotal,
      cartTotal: totalCartPrice,
      items: orderItems,
    } = calculateCartTotals(cartItems, fetchProductsFromDB);
    const newOrder = await Order.create({
      user: userId,
      deliveryInfo,
      orderItems,
      cartTotals: {
        tax,
        shipping,
        subTotal,
        total: totalCartPrice,
      },
      paymentMethod,
      paymentResult: {
        id: null,
        status: null,
        update_time: null,
        email_address: null,
      },
      isPaid: paymentMethod === "COD" ? false : true,
      orderStatus: "pending",
    });

    return successResponse(res, 201, "Order created successfully", newOrder);
  } catch (error) {
    if (error.name === "ZodError") {
      const firstError = error.errors[0]?.message || "Invalid input";
      return errorResponse(res, 400, firstError);
    }
    return errorResponse(res, 500, error.message);
  }
};


export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;
    const orders = await Order.find({ user: userId }).populate(
      "orderItems.product",
      "name price"
    );
    return successResponse(res, 200, "Orders fetched successfully", orders);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

