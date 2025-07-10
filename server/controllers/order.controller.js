import Order from "../models/order.model.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import Product from "../models/product.model.js";
import { calculateCartTotals } from "../utils/calculateCartTotals.js";
import Seller from "../models/seller.model.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const { cartItems, cartTotal, deliveryInfo, paymentMethod } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    // Map each item to include sellerId from Product
    const detailedProducts = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item.productId).select("seller");
        if (!product) throw new Error(`Product not found: ${item.productId}`);
        return {
          productId: item.productId,
          quantity: item.quantity,
          sellerId: product.seller,
        };
      })
    );

    const newOrder = await Order.create({
      user: userId,
      products: detailedProducts,
      cartTotal,
      deliveryInfo,
      paymentMethod,
    });

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await Order.find({})
      .populate("user", "name email") // populate user (buyer)
      .populate("products.productId", "name price") // optional: include product name/price
      .populate("products.sellerId", "name shopName email"); // populate seller info

    return successResponse(res, 200, "Orders fetched successfully", allOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    return errorResponse(res, 500, "Something went wrong");
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate("user", "name email") // populate user (buyer)
      .populate("products.productId", "name price") // optional: include product name/price
      .populate("products.sellerId", "name shopName email"); // populate seller info
    return successResponse(res, 200, "Order fetched successfully", order);
  } catch (error) {
    return errorResponse(res, 500, "Something went wrong");
  }
};

export const getOrdersByUserId = async (req, res) => {
  try {
    const userId = req.user._id;
   
    

    const orders = await Order.find({ user: userId })
      .sort({ createdAt: -1 })
      .populate("products.productId", "productName price")
      .populate("products.sellerId", "shopName email")
      .populate("user", "name email");

    return successResponse(res, 200, "Orders fetched successfully", orders);
  } catch (error) {
    console.error("[getOrdersByUserId]", error);
    return errorResponse(res, 500, "Failed to fetch user orders");
  }
};


export const getOrdersBySellerId = async (req, res) => {
  try {
    const userId = req.user.id;

    // Step 1: Find the seller profile using user ID
    const seller = await Seller.findOne({ user: userId });
    if (!seller) {
      return res.status(404).json({
        success: false,
        message: "Seller profile not found",
      });
    }

    const sellerId = seller._id; // This is the one stored in orders

    // Step 2: Fetch orders where this seller sold products
    const orders = await Order.find({ "products.sellerId": sellerId })
      .populate("products.productId") // product details
      .populate("user", "name email"); // buyer details

    // Step 3: Only return the seller's products per order
    const sellerOrders = orders.map((order) => {
      const sellerProducts = order.products.filter(
        (p) => p.sellerId.toString() === sellerId.toString()
      );

      return {
        ...order._doc,
        products: sellerProducts,
      };
    });

    res.status(200).json({
      success: true,
      orders: sellerOrders,
    });
  } catch (error) {
    console.error("🔥 Error fetching seller orders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch seller orders",
      error: error.message,
    });
  }
};




