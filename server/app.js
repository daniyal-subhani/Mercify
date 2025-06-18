import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import {connectDB} from "./config/db.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
connectDB();



export  default app;
