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
      ref: "Seller",
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
    offerPrice: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    sizes: [
      {
       type: mongoose.Schema.Types.ObjectId,
        ref: "Size",

      },
    ]
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || model("Product", productSchema);
export default Product;