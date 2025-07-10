import { backendRoutes } from "@/helpers/backendRoutes";
import { axiosInstance } from "@/lib/axiosInstance";

export const getAllUserProfiles = async () => {
  try {
    const response = await axiosInstance.get(
      ` ${backendRoutes.ALL_USERS.BASE}${backendRoutes.ALL_USERS.GET_ALL_USERS} `
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
