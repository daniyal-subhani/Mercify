import mongoose from "mongoose";

const sizeSchema = new mongoose.Schema({
  label: { type: String, required: true, unique: true },
});

const  Size = mongoose.model("Size", sizeSchema);
export default Size;
