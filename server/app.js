import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";
import { ROUTES } from "./helpers/routeNames.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_BASE_URL || "http://localhost:5173",
    credentials: true
}));
//  Routes
app.use(ROUTES.AUTH.BASE, authRoutes);
app.use(ROUTES.PRODUCT.BASE, productRoutes);
app.use(ROUTES.ORDER.BASE, orderRoutes);



export  default app;
