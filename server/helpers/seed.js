import dotenv from "dotenv";
dotenv.config();
import Category from "../models/productCategory.model.js";
import SubCategory from "../models/productSubCategory.model.js";
import Size from "../models/productSize.model.js";
import { connectDB } from "../config/db.connect.js";
import { DB_NAME } from "../constants.js";
import mongoose from "mongoose";


console.log("✅ MONGO_URI =", process.env.MONGO_URI);
console.log("✅ DB_NAME =", DB_NAME);
console.log("✅ Hardcoded test:", "mongodb://localhost:27017");

// await mongoose.connect("mongodb://localhost:27017/mercify");


// 1. Create Categories
const categories = await Category.insertMany([
  { name: "Men" },
  { name: "Women" },
  { name: "Kids" },
]);

// 2. Create Subcategories linked to categories
const men = categories.find((c) => c.name === "Men");
const women = categories.find((c) => c.name === "Women");
const kids = categories.find((c) => c.name === "Kids");

await SubCategory.insertMany([
  { name: "TopWear", categoryId: men._id },
  { name: "BottomWear", categoryId: men._id },
  { name: "WinterWear", categoryId: men._id },
  { name: "TopWear", categoryId: women._id },
  { name: "BottomWear", categoryId: women._id },
  { name: "WinterWear", categoryId: women._id },
  { name: "TopWear", categoryId: kids._id },
  { name: "BottomWear", categoryId: kids._id },
  { name: "WinterWear", categoryId: kids._id },
]);

// 3. Create Sizes
await Size.insertMany([
  { label: "S" },
  { label: "M" },
  { label: "L" },
  { label: "XL" },
  { label: "XXL" },
]);

console.log("✅ Seeded successfully");
process.exit();
