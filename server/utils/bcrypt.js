import bcrypt from "bcrypt";
import { errorResponse, successResponse } from "./responseHandler.js";

export const hashPassword = async (password) => {
  try {
    const hashed = await bcrypt.hash(password, 10);

    return hashed;
  } catch (error) {
    errorResponse(res, 500, error.message);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
     throw new Error("Password comparison failed");
    errorResponse(res, 500, error.message);
  }
};
