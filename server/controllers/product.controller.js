import Product from "../models/product.model.js";
import Seller from "../models/seller.model.js";
import { uploadToCloudinary } from "../utils/cloudinary_upload_helper.js";
import { formatProductResponse } from "../utils/formatData.js";
import { errorResponse, successResponse } from "../utils/responseHandler.js";
import { createProductSchema } from "../validators/product.validator.js";

export const createProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      category,
      subCategory,
      sizes,
      stock,
      price,
      offerPrice,
    } = req.validated;
   

    const userId = req.user?._id;
    if (!userId) {
      return errorResponse(res, 401, "Unauthorized: User ID missing");
    }
    const seller = await Seller.findOne({ user: userId });

    if (!seller) {
      return errorResponse(res, 404, "Seller not found");
    }
    //  image files from frontend
    const files = req.files;
  

    if (!files || files.length === 0) {
      return errorResponse(res, 400, "At least one product image is required");
    }
    //  upload images to cloudinary
    const uploadPromises = files.map((file) =>
      uploadToCloudinary(file.buffer, "products")
    );
    const uploadResults = await Promise.all(uploadPromises);


    const productImages = uploadResults.map((result) => result.secure_url);

    // Check if product already exists by this seller
    const existingProduct = await Product.findOne({
      productName,
      seller: seller._id,
    });

    if (existingProduct) {
      return errorResponse(res, 400, "Product already exists");
    }
    // save new product to db
    const newProduct = await Product.create({
      productName,
      seller: seller._id,
      description: productDescription,
      category,
      subCategory,
      sizes,
      stock,
      price,
      offerPrice,
      images: productImages,
    });
   

    return successResponse(res, 201, "Product created successfully", {
      product: newProduct,
    });
  } catch (error) {
    console.error("❌ Product creation failed:", error);
    if (error.name === "ZodError") {
      const firstError = error.errors[0]?.message || "Invalid input";
      return errorResponse(res, 400, firstError);
    }

    return errorResponse(res, 500, error.message);
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const { category, subCategory, sort, search } = req.query;
    const query = {};
    if (category) {
      query.category = { $in: category.split(",") };
    }
    if (subCategory) {
      query.subCategory = { $in: subCategory.split(",") };
    }
    if (search) {
      query.productName = { $regex: search, $options: "i" };
    }
    let sortOptions = {};
    if (sort === "lowToHigh") {
      sortOptions.price = 1;
    } else if (sort === "highToLow") {
      sortOptions.price = -1;
    } else {
      sortOptions.createdAt = -1;
    }
    const products = await Product.find(query)
      .populate("seller", "_id shopName")
      .sort(sortOptions);
    return successResponse(res, 200, "Products fetched successfully", products);
  } catch (error) {
    return errorResponse(res, 500, "Something went wrong");
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

export const getProductWithRelated = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }
    const relatedProducts = await Product.find({
      category: product.category,
      _id: { $ne: id },
    })
      .limit(5)
      .select("productName price images _id category");
    return successResponse(res, 200, "Product fetched successfully", {
      product,
      relatedProducts,
    });
  } catch (error) {
    return errorResponse(res, 500, "Something went wrong");
  }
};


export const getProductsBySeller = async (req, res) => {
  try {
    const userId = req.user.id;
    const seller = await Seller.findOne({ user: userId });
    if (!seller) {
      return res.status(404).json({ success: false, message: "Seller not found" });
    }

    const products = await Product.find({ seller: seller._id });
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching seller products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
