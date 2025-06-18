import User from "../models/user.model";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return errorResponse(res, 401, "Unauthorized");
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decode._id);
    next();
  } catch (error) {
    return errorResponse(res, 401, "Unauthorized");
  }
};


export const isSeller = (req, res, next) => {
  if (!req.user || req.user.role !== "seller") {
    return errorResponse(res, 403, "Only seller can access this route");
  }
  next();
}
