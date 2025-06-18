import User from "../models/user.model.js";
import { hashPassword } from "../utils/bcrypt.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import {
  errorResponse,
  successResponse,
} from "../utils/responseHandler.js";
import { formatUserResponse } from "../utils/formatData.js";

// ✅ REGISTER CONTROLLER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.validated;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "User already exists");
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return successResponse(res, 201, "User created successfully", {
      user: formatUserResponse(newUser),
      accessToken,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// ✅ LOGIN CONTROLLER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.validated;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return errorResponse(res, 401, "Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return successResponse(res, 200, "User logged in successfully", {
      user: formatUserResponse(user),
      accessToken,
    });
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

// ✅ LOGOUT CONTROLLER
export const logoutUser = (req, res) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "None",
    });

    return successResponse(res, 200, "User logged out successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};
// ✅ REFRESH TOKEN CONTROLLER

export const refreshAccessToken = async (req, res)=> {
  try {
    // Do it later
  } catch (error) {
     return errorResponse(res, 403, "Invalid or expired refresh token");
  }
}