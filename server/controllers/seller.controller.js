import User from "../models/user.model";
import { errorResponse } from "../utils/responseHandler"


export const sellerRegister =async (req, res) => {
    try {
        const { shopName, GSTNumber, businessAddress} = req.body;
        if (!shopName || !GSTNumber || !businessAddress) {
            return errorResponse(res, 400, "All fields are required");
        }
       const userId = req.user._id;
       const user = await User.findById(userId);
       if (!user) {
        return errorResponse(res, 404, "User not found");
       }
     if (user.role === "seller") {
      return errorResponse(res, 400, "User is already a seller");
    }
    const existingSeller  = await Seller.findOne({ user: userId });
    if (existingSeller) {
      return errorResponse(res, 400, "Seller already exists");
    }
    const seller = await Seller.create({
        user: userId,
        shopName,
        GSTNumber,
        businessAddress,
    });
    user.role = "seller";
    await user.save();
    return successResponse(res, 201, "Seller registered successfully", { seller });
    } catch (error) {
        errorResponse(res, 500, error.message);
    }
}
