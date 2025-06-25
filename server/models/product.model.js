import mongoose, { Schema, model } from "mongoose";


const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [
      {
        type: String,
      },
    ],
    color: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || model("Product", productSchema);
export default Product;