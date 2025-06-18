import { getEnv } from "@/helpers/getEnv";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: getEnv("BACKEND_BASE_URL"),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
