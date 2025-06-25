import Seller from "../models/seller.model.js";
import User from "../models/user.model.js";
import { errorResponse } from "../utils/responseHandler.js";

export const sellerRegister = async (req, res) => {
  try {
    const userId = req.user._id;
    const { shopName, gstNumber, businessAddress } = req.validated;
    const user = await User.findById(userId);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    if (user.role === "seller") {
      return errorResponse(res, 400, "User is already a seller");
    }
    const existingSeller = await Seller.findOne({ user: userId });
    if (existingSeller) {
      return errorResponse(res, 400, "Seller already exists");
    }
    const seller = await Seller.create({
      user: userId,
      shopName,
      gstNumber,
      businessAddress,
    });
    user.role = "seller";
    await user.save();
    return successResponse(res, 201, "Seller registered successfully", {
      seller,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getSellerProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const seller = await Seller.findOne({ user: userId })
      .populate("user", "_id name email ")
      .lean();
    if (!seller) {
      return errorResponse(res, 404, "Seller not found");
    }
    return successResponse(res, 200, "Seller profile fetched successfully", {
      seller,
    });
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const editSellerProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, avatar, bio, shopName, gstNumber, businessAddress } =
      req.validated;
    await User.findByIdAndUpdate(userId, { name, email, avatar, bio });
    const updatedSeller = await Seller.findOneAndUpdate(
      { user: userId },
      { shopName, gstNumber, businessAddress },
      { new: true, runValidators: true }
    ).populate("user", "name email avatar bio");
    if (!updatedSeller) {
      return errorResponse(res, 404, "Seller not found");
    }
    return successResponse(res, 200, "Seller profile updated successfully", {
      seller: updatedSeller,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


export const deleteSeller = async (req, res) => {
  try {
    const userId = req.user._id;
    const seller = await Seller.findOne({ user: userId });
    if (!seller) {
      return errorResponse(res, 404, "Seller not found");
    }
    await User.findByIdAndDelete(userId);
    await Seller.findByIdAndDelete(seller._id);
    return successResponse(res, 200, "Seller deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};