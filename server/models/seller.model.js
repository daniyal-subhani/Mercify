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
      trim: true,
    },
    businessEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipcode: { type: String, required: true },
      country: { type: String, required: true },
    },
    gstNumber: {
      type: String,
      required: false,
    },
    avatar: {
      type: String, // Cloudinary image URL or placeholder
      default: "",
    },
  },
  { timestamps: true }
);

const Seller = mongoose.models.Seller  || mongoose.model("Seller", sellerSchema);
export default Seller;
