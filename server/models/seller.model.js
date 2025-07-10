import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    shopName: {
      type: String,
      required: true,
    },
    businessAddress: {
      type: String,
      required: true,
    },
    GSTNumber: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  { timestamps: true }
);

const Seller = mongoose.models.Seller || mongoose.model("Seller", sellerSchema);
export default Seller;
