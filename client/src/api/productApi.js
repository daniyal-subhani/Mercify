import { backendRoutes } from "@/helpers/backendRoutes";
import { axiosInstance } from "@/lib/axiosInstance";

export const addProduct =async (productData) => {
  try {
    const response =await axiosInstance.post(
      `${backendRoutes.PRODUCT.BASE}${backendRoutes.PRODUCT.ADD_PRODUCT}`,
      productData,

      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    console.log("API Response:", response);
    if (!response.data) {
      throw new Error("No data received from the API");
      
    }
    
    return response.data;
  } catch (error) {
    console.error("API Error Details:", {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error.response?.data.message || "Failed to add product" 
  }
};

export const getProductByName = async (productId) => {
  try {
    const response = await axiosInstance.get(`
        ${backendRoutes.PRODUCT.BASE}${backendRoutes.PRODUCT.GET_PRODUCT}/${productId}
        `);
  } catch (error) {
    return error.response.data.message || "Failed to get product";
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axiosInstance.get(`
      ${backendRoutes.PRODUCT.BASE}${backendRoutes.PRODUCT.GET_PRODUCT}/${productId}
      `);
  } catch (error) {
    return error.response.data.message;
  }
};

export const getAllProducts = () => {
  try {
    const response = axiosInstance.get(`
        ${backendRoutes.PRODUCT.BASE}${backendRoutes.PRODUCT.GET_ALL_PRODUCTS}
        `);
  } catch (error) {
    return error.response.data.message || "Failed to get all products";
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await axiosInstance.delete(` 
      ${backendRoutes.PRODUCT.BASE}${backendRoutes.PRODUCT.DELETE_PRODUCT}/${productId}
      `);
  } catch (error) {
    return error.response.data.message || "Failed to delete product";
  }
};
