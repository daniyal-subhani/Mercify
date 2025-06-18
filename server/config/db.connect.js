import mongoose from "mongoose";
import { errorResponse } from "../utils/responseHandler";
import { DB_NAME } from "../constants";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log("Error connecting to database:", error);
    errorResponse(res, 500, error.message);
    process.exit(1);
  }
};
