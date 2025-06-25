import mongoose from "mongoose";

const deliveryInfoSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    country: { type: String, required: true },
  },
  { _id: false }
);

const orderItemSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    seller: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    deliveryInfo: deliveryInfoSchema,
    orderItems: [orderItemSchema],

    subtotal: { type: Number, required: true, default: 0 },
    tax: { type: Number, required: true, default: 0 },
    shipping: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },

    paymentMethod: { type: String, required: true, enum: ["COD", "stripe"] },
    paymentResult: {
     id: { type: String , default: null },
      status: { type: String , default: null },
      update_time: { type: String, default: null },
      email_address: { type: String, default: null },
    },

    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },

    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },

    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
