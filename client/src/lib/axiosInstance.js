import { getEnv } from "@/helpers/getEnv";
import { store } from "@/store/store";
import axios from "axios";
import { getCookie, setCookie } from "./cookies";

export const axiosInstance = axios.create({
  baseURL: getEnv("BACKEND_BASE_URL"),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

//  Add request interceptor to attach token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCookie("accessToken"); // Your cookie getter function
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//  Add response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    //  If error is 401 and we haven't already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        //  Attempt to refresh the token
        const response = await axiosInstance.post("/auth/refresh-token");
        //  If successful, update the token and retry the original request
        const { accessToken } = response.data;
        //  Update stored token
        setCookie("accessToken", accessToken);
        // Update the authorization header
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        //  Retry the original request
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        //  If token refresh fails, redirect to login
        console.log("Error refreshing token:", refreshError);
        // Redirect to login
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const state = store.getState()
//     const accessToken = state.auth.accessToken;
//     console.log("Access Token:", store.getState().auth.accessToken);

//    if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject("Error in request interceptor:", error);
//   }
// );
