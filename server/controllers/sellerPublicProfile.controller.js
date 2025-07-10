import Seller from "../models/seller.model.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";


export const sellerPublicProfile = async (req, res) => {
  try {
    const {userId} = req.params;
    const seller = await Seller.findById(userId).populate("user", "_id name email").lean();
    if (!seller) {
      return errorResponse(res, 404, "User not found");
    }
    return successResponse(res, 200, "User profile fetched successfully", {
      seller,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};