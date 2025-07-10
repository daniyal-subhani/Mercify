import Category from "../models/productCategory.model.js";
import Size from "../models/productSize.model.js";
import SubCategory from "../models/productSubCategory.model.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    successResponse(res, 200, "Categories fetched successfully", categories);
  } catch (error) {
    return errorResponse(res, 500, "Internal Server Error");
  }
};

export const getSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate(
      "categoryId",
      "name"
    );
    successResponse(
      res,
      200,
      "SubCategories fetched successfully",
      subCategories
    );
  } catch (error) {
    return errorResponse(res, 500, "Internal Server Error");
  }
};

export const getSizes = async (req, res) => {
  try {
    const sizes = await Size.find().sort({ label: 1 });
    successResponse(res, 200, "Sizes fetched successfully", sizes);
  } catch (error) {
    return errorResponse(res, 500, "Internal Server Error");
  }
};
