import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import ProfilePicture from "@/components/Avatar";
import { Camera, Pencil } from "lucide-react";
import { getUserProfile } from "@/api/userApi";
import { useDispatch } from "react-redux";
import { getUserThunk } from "@/store/thunks/userDashboardThunk";

const UserProfile = ({ userId }) => {
  const [preview, setPreview] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const fileInputRef = useRef();

  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    bio: false,
  });

  const nameRef = useRef();
  const emailRef = useRef();
  const bioRef = useRef();

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    // TODO: upload to Cloudinary or backend
    const formData = new FormData();
    formData.append("file", file);
    // await axios.post('/upload', formData);
  };

  useEffect(() => {
    const fetchUserFromDB = async () => {
      const userId = user.id;
      try {
        const userData = await dispatch(getUserThunk(userId));
        setUser(userData.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (userId) fetchUserFromDB();
  }, [userId]);

  if (!user) return <p className="text-center py-10">Loading user...</p>;

  const enableEdit = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: true }));

    setTimeout(() => {
      if (field === "name") nameRef.current?.focus();
      if (field === "email") emailRef.current?.focus();
      if (field === "bio") bioRef.current?.focus();
    }, 10);
  };

  const onSubmit = (data) => {
    setEditMode({ name: false, email: false, bio: false });
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      <Card>
        <CardContent className="space-y-6 py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Profile Picture */}
            <div className="relative group w-32 h-32 mx-auto">
              {/* Avatar component */}
              <div
                className="relative group w-fit mx-auto cursor-pointer"
                onClick={handleAvatarClick}
              >
                <ProfilePicture
                  src={preview || "/default-avatar.jpg"}
                  size="lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" />
                </div>
              </div>

              {/* Hidden file input */}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                hidden
              />
            </div>

            {/* Full Name */}
            <div className="relative">
              <label className="font-medium text-sm">Full Name</label>
              <Input
                {...register("name")}
                ref={nameRef}
                readOnly={!editMode.name}
                placeholder="Full Name"
                className="h-12 text-base mt-1 border-0 border-b border-gray-300 focus:border-black focus:ring-0 focus:outline-none"
              />
              <Pencil
                className="absolute top-8 right-3 h-4 w-4 cursor-pointer text-gray-500"
                onClick={() => enableEdit("name")}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label className="font-medium text-sm">Email</label>
              <Input
                {...register("email")}
                ref={emailRef}
                type="email"
                readOnly={!editMode.email}
                placeholder="Email"
                className="h-12 text-base mt-1 border-0 border-b border-gray-300 focus:border-black focus:ring-0 focus:outline-none"
              />
              <Pencil
                className="absolute top-8 right-3 h-4 w-4 cursor-pointer text-gray-500"
                onClick={() => enableEdit("email")}
              />
            </div>

            {/* Bio */}
            <div className="relative">
              <label className="font-medium text-sm">Bio</label>
              <Textarea
                {...register("bio")}
                ref={bioRef}
                readOnly={!editMode.bio}
                placeholder="Bio"
                className="text-base mt-1 border-0 border-b border-gray-300 focus:border-black focus:ring-0 focus:outline-none"
              />
              <Pencil
                className="absolute top-8 right-3 h-4 w-4 cursor-pointer text-gray-500"
                onClick={() => enableEdit("bio")}
              />
            </div>

            {/* Save Button */}
            <Button type="submit" className="w-full h-12 text-base">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
