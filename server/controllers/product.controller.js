import Product from "../models/product.model.js";
import Seller from "../models/seller.model.js";
import { formatProductResponse } from "../utils/formatData.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import { createProductSchema } from "../validators/product.validator.js";

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

export const getAllProducts = (req, res) => {
  try {
    const products = Product.find({})
      .populate("uploadedBy", "_id name email")
      .select("-__v");
    return successResponse(res, 200, "Products fetched successfully", products);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const getProductByName = async (req, res) => {
  try {
    const { productName } = req.params;
    const product = await Product.findOne({ productName })
      .populate("uploadedBy", "_id name email")
      .select("-__v");
    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }
    return successResponse(res, 200, "Product fetched successfully", product);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

export const editProduct = (req, res) => {
  try {
    const { productId } = req.params;
    const sellerId = req.user._id;
    const { name, description, price, quantity, category, images } =
      req.validated;
    const product = Product.findOneAndUpdate(
      { _id: productId, uploadedBy: sellerId },
      {
        name,
        description,
        price,
        quantity,
        category,
        images,
      },
      { new: true, runValidators: true }
    );
    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }
    return successResponse(res, 200, "Product updated successfully", product);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const sellerId = req.user._id;
    const product = await Product.findOneAndDelete({
      _id: productId,
      uploadedBy: sellerId,
    });
    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }
    return successResponse(res, 200, "Product deleted successfully");
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};