import { Router } from "express";
import { ROUTES } from "../helpers/routeNames.js";
import { getSellerDashboardStats } from "../controllers/seller.controller.js";
import { authTokenMiddleware } from "../middlewares/auth.middleware.js";


const sellerStats = Router();

sellerStats.get(ROUTES.DASHBOARD_DATA.GET_SELLER_DASHBOARD, authTokenMiddleware ,getSellerDashboardStats)

export default sellerStats;