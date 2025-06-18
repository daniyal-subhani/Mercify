import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    role: {
      type: String,
      enum: {
        values: ["user", "seller"],
        message: "{VALUE} is not supported",
      },
      default: "user",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      maxlength: 50,
    },
  },
  { timestamps: true }
);


const User = models.User || model("User", userSchema);
export default User;
