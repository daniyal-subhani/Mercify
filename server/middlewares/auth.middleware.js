import User from "../models/user.model.js";
import { errorResponse } from "../utils/responseHandler.js";
import jwt from "jsonwebtoken";


export const authTokenMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken || req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return errorResponse(res, 401, "Unauthorized");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);


    req.user = await User.findById(decoded.id).select("_id name email role");
    if(!req.user) {
      return errorResponse(res, 404, "User not found");
    }
    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", {
      error: err.message,
      receivedToken: token,
      currentSecret: process.env.JWT_ACCESS_SECRET
    });
    return errorResponse(res, 401, "Unauthorized");
  }
};


export const isSeller = (req, res, next) => {
  if (!req.user || req.user.role !== "seller") {
    return errorResponse(res, 403, "Only seller can access this route");
  }
  next();
};
