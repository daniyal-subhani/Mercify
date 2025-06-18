import Product from "../models/product.model";
import Seller from "../models/seller.model";
import { formatProductResponse } from "../utils/formatData";
import { errorResponse, successResponse } from "../utils/responseHandler";
import { createProductSchema } from "../validators/product.validator";

export const createProduct = async (req, res) => {
  try {
    const validatedData = createProductSchema.parse(req.body);
    const userId = req.user._id;
    const seller = await Seller.findOne({ user: userId });
    if (!seller) {
      return errorResponse(res, 404, "Seller not found");
    }
    const existingProduct = await Product.findOne({
      productName: validatedData.productName,
      uploadedBy: seller._id,
    });
    if (existingProduct) {
      return errorResponse(res, 400, "Product already exists");
    }
    const newProduct = await Product.create({
      ...validatedData,
      uploadedBy: seller._id,
    });
    successResponse(res, 201, "Product created successfully", newProduct);
  } catch (error) {
    // ❌ Handle Zod validation errors
    if (error.name === "ZodError") {
      const firstError = error.errors[0]?.message || "Invalid input";
      return errorResponse(res, 400, firstError);
    }

    // ❌ Handle other errors
    return errorResponse(res, 500, error.message);
  }
};
