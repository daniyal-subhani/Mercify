import User from "../models/user.model.js";

export const getSellerProfile = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            status: "success",
            data: {
                user
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

export const updateSellerProfile = async (req, res) => {
    try {
        const user = req.user;
        const { name, email, phone } = req.body;
        const updatedUser = await User.findByIdAndUpdate(user._id, {
            name,
            email,
            phone
        }, { new: true });
        res.status(200).json({
            status: "success",
            data: {
                user: updatedUser
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}