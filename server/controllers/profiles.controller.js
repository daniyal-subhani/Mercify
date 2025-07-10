import Product from "../models/product.model.js";
import Seller from "../models/seller.model.js";
import User from "../models/user.model.js";
import { uploadToCloudinary } from "../utils/cloudinary_upload_helper.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import { updateUserProfileSchema } from "../validators/user.validator.js";

export const getProfiles = async (req, res) => {
  
  const { id, role } = req.user;
  
  try {
    if (role === "user") {
      const user = await User.findById(id);
      if (!user) {
        return errorResponse(res, 404, "User not found");
      }
      return successResponse(res, 201, "User fetch successfully", user);
    } else if (role === "seller") {
     const seller = await Seller.findOne({ user: id }).populate("user", "name email profilePicture bio");

      
      if (!seller) {
        return errorResponse(res, 404, "Seller not found");
      }
      return successResponse(res, 201, "Seller fetch successfully", seller);
    }
  } catch (error) {
    return errorResponse(res, 500, "Internal server error");
  }
};


export const updateUserProfiles = async (req, res) => {
  try {
    const { id, role } = req.user;
    const file = req.file;
    const { name, email, bio } = req.body;

    // ✅ Run Zod validation manually
    const parsed = updateUserProfileSchema.safeParse({ name, email, bio });
    if (!parsed.success) {
      const message = parsed.error.errors[0]?.message || "Invalid input";
      return errorResponse(res, 400, message);
    }

    if (!file) {
      return errorResponse(res, 404, "Profile Picture is required");
    }

    const uploadedImage = await uploadToCloudinary(file.buffer, "users");
    const profilePicture = uploadedImage.secure_url;

    if (role === "user") {
      await User.findByIdAndUpdate(
        id,
        {
          name: parsed.data.name,
          email: parsed.data.email,
          bio: parsed.data.bio,
          profilePicture,
        },
        { new: true }
      );
    } else {
      return errorResponse(res, 403, "Unauthorized Role");
    }

    return successResponse(res, 200, "Profile Updated Successfully.");
  } catch (error) {
    console.error("Update Profile Error:", error);
    return errorResponse(res, 500, "Internal Server Error");
  }
};

export const updateSellerDashboard = async (req, res) => {
  try {
    const { id, role } = req.user;
    const {
      name,
      email,
      bio,
      shopName,
      GSTNumber,
      businessAddress,
      phone,
    } = req.body;

    const file = req.file;
    if (!file) {
      return errorResponse(res, 404, "Profile Picture is required");
    }

    const uploadedImage = await uploadToCloudinary(file.buffer, "sellers");
    const profilePicture = uploadedImage.secure_url;

    if (role !== "seller") {
      return errorResponse(res, 403, "Unauthorized Role");
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        name,
        email,
        bio,
        profilePicture,
      },
      { new: true }
    );

    // Update seller by user ID
    const updatedSeller = await Seller.findOneAndUpdate(
      { user: id },
      {
        shopName,
        GSTNumber,
        businessAddress,
        phone,
      },
      { new: true }
    );

    if (!updatedSeller) {
      return errorResponse(res, 404, "Seller not found");
    }

    return successResponse(res, 200, "Profile Updated Successfully.", {
      user: updatedUser,
      seller: updatedSeller,
    });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return errorResponse(res, 500, "Internal Server Error");
  }
};



export const getSellerProfilePage = async (req, res) => {
  try {
    const { sellerId } = req.params;

    const seller = await Seller.findById(sellerId).populate("user", "_id name email  bio profilePicture role");
    if (!seller) return res.status(404).json({ message: "Seller not found" });

    const products = await Product.find({ seller: seller._id });


    res.status(200).json({
      success: true,
      message: "Seller profile fetched successfully",
      data: { seller, products },
    });
  } catch (error) {
    console.error("❌ Error fetching seller profile:", error);
    res.status(500).json({ message: "Failed to fetch seller profile", error });
  }
};
