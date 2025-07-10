import { backendRoutes } from "@/helpers/backendRoutes";
import { axiosInstance } from "@/lib/axiosInstance";

export const getSellerProfile = async () => {
  try {
    const response = await axiosInstance.get(`
        ${backendRoutes.SELLER.BASE}${backendRoutes.SELLER.PROFILE}`);
        const {seller} = response.data.data
        return seller
  } catch (error) {
    return error.response.data.message || "Failed to get seller profile";
  }
};
