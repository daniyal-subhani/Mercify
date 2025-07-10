import User from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary_upload_helper.js";
import { formatUserResponse } from "../utils/formatData.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select(
      "name email avatar bio createdAt updatedAt"
    );
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    return successResponse(res, 200, "User profile fetched successfully", {
      user: formatUserResponse(user),
    });
  } catch (error) {
    return errorResponse(res, 500, "Something went wrong", error.message);
  }
};

export const updatedUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { name, email, bio } = req.validated;
    let avatarUrl;
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, "users");
      avatarUrl = result.secure_url;
    }
    const updatedFields = { name, email, bio };
    if (avatarUrl) {
      updatedFields.avatar = avatarUrl;
    }
    const user = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    return successResponse(res, 200, "User profile updated successfully", user);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    const userId = req.params.userId;
    if (req.user._id.toString() !== userId) {
      return errorResponse(res, "Unauthorized", 401);
    }
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    return successResponse(res, 200, "User profile deleted successfully", user);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
