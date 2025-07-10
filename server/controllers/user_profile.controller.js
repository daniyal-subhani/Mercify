import User from "../models/user.model.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";

export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById({userId})
       if(user) {
        return errorResponse(res, 501, "Something went wrong")
    }
     successResponse(res, 201, "User fetch successfully", user)
    } catch (error) {
       return errorResponse(res, 404, "Profile Not Found")
    }
}

export const updateUserProfile = async (req, res) => {
    try {
        const user = req.user;
        const { name, email, phone } = req.body;
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            name,
            email,
            phone
        }, { new: true });
        if(!updatedUser) {
            return errorResponse(res, 501, "Something went wrong")
        }
        successResponse(res, 200, "Profile Updated Successfully" , updatedUser)
    } catch (error) {
       return errorResponse(res, 404, "Profile Not Found")
    }
}