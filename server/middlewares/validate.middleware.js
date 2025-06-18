import { errorResponse, successResponse } from "../utils/responseHandler.js";

export const validateSchema = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);
    req.validated = {
      ...parsed,
      role: req.user?.role,
      userId: req.user?._id,
    };
    next();
  } catch (error) {
    const message = error?.errors?.[0]?.message || "Invalid request";
    errorResponse(res, 400, message);
  }
};
