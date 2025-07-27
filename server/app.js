import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import productRoutes from "./routes/product.route.js";
import orderRoutes from "./routes/order.route.js";
import { ROUTES } from "./helpers/routeNames.js";
import userRoutes from "./routes/user_profile.route.js";
import sellerRoutes from "./routes/seller_profile.route.js";
import productMetaDataRoutes from "./routes/productMetaData.route.js";
import publicRoutes from "./routes/publicProfiles.route.js";
import getAllUsers from "./routes/allUsers.route.js";
import becomeSellerRoute from "./routes/becomeSeller.route.js";
import profilesRoutes from "./routes/profiles.route.js";
import sellerStats from "./routes/seller.dashboard.stats.route.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
const allowedOrigins = [
  "http://localhost:5173",
  "https://mercify.vercel.app",
  "https://www.mercify.com",
  "https://mercify-git-main-daniyal-subhanis-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
//  Routes
app.get("/ping", (req, res) => {
  res.status(200).json({ message: "pong" });
});

app.use(ROUTES.AUTH.BASE, authRoutes);
app.use(ROUTES.USER.BASE, userRoutes);
app.use(ROUTES.SELLER.BASE, sellerRoutes);
app.use(ROUTES.PRODUCT.BASE, productRoutes);
app.use(ROUTES.ORDER.BASE, orderRoutes);
app.use(ROUTES.PRODUCT_META_DATA.BASE, productMetaDataRoutes);
app.use(ROUTES.PUBLIC_PROFILES.BASE, publicRoutes);
app.use(ROUTES.ALL_USERS.BASE, getAllUsers);
app.use(ROUTES.SELLER.BASE, becomeSellerRoute);
app.use(ROUTES.PROFILES.BASE, profilesRoutes);
app.use(ROUTES.DASHBOARD_DATA.BASE, sellerStats);

export default app;
