import User from "../models/user.model.js";


export const getAllUserProfile = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
};