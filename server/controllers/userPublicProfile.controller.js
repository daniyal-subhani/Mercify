import User from "../models/user.model.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js"


export const userPublicProfile = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
        return errorResponse(res, 404, "User not found");
    }
    return successResponse(res, 200, "User profile fetched successfully", {
      user,
    });
  } catch (error) {
    return errorResponse(res, 500, "Internal Server Error");
  }
}
