import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Pencil } from "lucide-react";
import ProfilePicture from "@/components/Avatar";
import { axiosInstance } from "@/lib/axiosInstance";
import { backendRoutes } from "@/helpers/backendRoutes";
import { userProfileData } from "@/hooks/profilesData";
import { showToast } from "@/components/shared/showToast";

const SellerProfile = () => {
  const { profileData, loading, error, refetch } = userProfileData();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [editMode, setEditMode] = useState({});
  const [preview, setPreview] = useState("/default-avatar.jpg");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    if (profileData) {
      const { user, shopName, businessAddress, GSTNumber, phone } = profileData;

      reset({
        name: user?.name || "",
        email: user?.email || "",
        bio: user?.bio || "",
        profilePicture: user?.profilePicture || "",
        storeName: shopName || "",
        businessAddress: businessAddress || "",
        GSTNumber: GSTNumber || "",
        phone: phone || "",
      });

      setPreview(user?.profilePicture || "/default-avatar.jpg");
    }
  }, [profileData, reset]);

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  const enableEdit = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: true }));
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // User fields
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("bio", data.bio);

      // Seller fields
      formData.append("shopName", data.storeName);
      formData.append("businessAddress", data.businessAddress);
      formData.append("GSTNumber", data.GSTNumber);
      formData.append("phone", data.phone);

      if (selectedFile) {
        formData.append("profilePicture", selectedFile);
      }

      await axiosInstance.put(
        `${backendRoutes.PROFILE.BASE}${backendRoutes.PROFILE.SELLER_UPDATE}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      await refetch();
      setEditMode({});
      showToast({
        message: "Profile updated successfully",
        type: "success",
    
      })
   
    } catch (err) {
      showToast({
        message: "Failed to update profile",
        type: "error",
      });
      console.error("❌ Failed to update seller profile:", err);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Seller Profile</h1>

      <Card>
        <CardContent className="space-y-8 py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Avatar Upload */}
            <div
              className="relative group w-fit mx-auto cursor-pointer"
              onClick={handleAvatarClick}
            >
              <ProfilePicture src={preview} size="lg" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Camera className="text-white" />
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                hidden
              />
            </div>

            {/* Editable Inputs */}
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone Number", name: "phone", type: "text" },
              { label: "Store Name", name: "storeName", type: "text" },
              { label: "Business Address", name: "businessAddress", type: "text" },
              { label: "GST Number", name: "GSTNumber", type: "text" },
            ].map(({ label, name, type }) => (
              <div className="relative" key={name}>
                <label className="font-medium text-sm">{label}</label>
                <Input
                  type={type}
                  placeholder={label}
                  readOnly={!editMode[name]}
                  className="h-12 text-base mt-1 border-0 border-b border-gray-300 focus:border-black focus:ring-0 focus:outline-none"
                  {...register(name)}
                />
                <Pencil
                  className="absolute top-8 right-3 h-4 w-4 cursor-pointer text-gray-500"
                  onClick={() => enableEdit(name)}
                />
              </div>
            ))}

            {/* Bio Field */}
            <div className="relative">
              <label className="font-medium text-sm">Bio</label>
              <Textarea
                placeholder="Tell your story..."
                readOnly={!editMode.bio}
                className="text-base mt-1 border-0 border-b border-gray-300 focus:border-black focus:ring-0 focus:outline-none resize-none"
                {...register("bio")}
              />
              <Pencil
                className="absolute top-8 right-3 h-4 w-4 cursor-pointer text-gray-500"
                onClick={() => enableEdit("bio")}
              />
            </div>

            <Button type="submit" className="w-full h-12 text-base">
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerProfile;
