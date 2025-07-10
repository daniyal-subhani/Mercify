import User from "../models/user.model.js";
import { comparePassword, hashPassword } from "../utils/bcrypt.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import { formatUserResponse } from "../utils/formatData.js";
import { authTokenMiddleware } from "../middlewares/auth.middleware.js";
import { clearCookie, setCookie } from "../utils/cookies.js";
import jwt from "jsonwebtoken";

// ✅ REGISTER CONTROLLER
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, bio } = req.validated;

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
      bio,
      
    });

    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    setCookie(res, accessToken, refreshToken);

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



    const isPasswordValid = await comparePassword(password, user.password);
  
    if (!isPasswordValid) {
     

      return errorResponse(res, 401, "Invalid credentials");
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    setCookie(res, accessToken, refreshToken);

    return successResponse(res, 200, "User logged in successfully", {
      user: formatUserResponse(user),
      accessToken,
    });
  } catch (error) {
    console.error("Login Error:", error);
    return errorResponse(res, 500, error.message);
  }
};

// ✅ LOGOUT CONTROLLER
export const logoutUser = (req, res) => {
  try {
    clearCookie(res);

    return successResponse(res, 200, "User logged out successfully");
  } catch (error) {
    return errorResponse(res, 500, "Internal server error");
  }
};
// ✅ REFRESH TOKEN CONTROLLER

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return errorResponse(res, 403, "Refresh token not found");
    }
    //  Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    //  Find the user associated with the refresh token
    const user = await User.findById(decoded.id);
    if (!user) {
      return errorResponse(res, 404, "User not found");
    }
    //  Generate  new  tokens
    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);
    //  Set the new tokens in the response cookies
    setCookie(res, newAccessToken, newRefreshToken);
    return successResponse(res, 200, "Access token refreshed successfully", {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });
  } catch (error) {
    console.error("Refresh Token Error:", error);
    return errorResponse(res, 403, "Invalid or expired refresh token");
  }
};
