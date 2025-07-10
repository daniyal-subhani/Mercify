import dotenv from "dotenv";
import mongoose from "mongoose";
import Category from "../models/productCategory.model.js";
import SubCategory from "../models/productSubCategory.model.js";
import Size from "../models/productSize.model.js";
import { connectDB } from "../config/db.connect.js";
import { DB_NAME } from "../constants.js";

dotenv.config({
  path: "../.env", // adjust if needed
});

console.log("✅ MONGO_URI =", process.env.MONGO_URI);
console.log("✅ DB_NAME =", DB_NAME);
console.log("✅ Hardcoded test:", "mongodb://localhost:27017");

try {
  // 🔌 Wait for MongoDB connection before seeding
  await connectDB();

  console.log("✅ Connected to MongoDB");

  // Optional cleanup if you want to reset
  await Category.deleteMany({});
  await SubCategory.deleteMany({});
  await Size.deleteMany({});

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

  await mongoose.connection.close();
  process.exit(0);
} catch (err) {
  console.error("❌ Seed error:", err.message);
  process.exit(1);
}
