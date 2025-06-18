import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { Camera, Pencil } from "lucide-react";
import ProfilePicture from "@/components/Avatar";

const mockUser = {
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "0312-1234567",
  storeName: "John's Sneaker Store",
  businessAddress: "123 Mall Road, Lahore",
  bio: "Passionate seller of premium sneakers.",
};

const SellerProfile = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const [editMode, setEditMode] = useState({});
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef();

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

  const refs = {
    name: useRef(),
    email: useRef(),
    phone: useRef(),
    storeName: useRef(),
    businessAddress: useRef(),
    bio: useRef(),
  };

  useEffect(() => {
    Object.entries(mockUser).forEach(([key, value]) => setValue(key, value));
  }, [setValue]);

  const enableEdit = (field) => {
    setEditMode((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => refs[field]?.current?.focus(), 10);
  };

  const onSubmit = (data) => {
    console.log("Updated Seller Profile:", data);
    setEditMode({});
    navigate("/");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8">Seller Profile</h1>

      <Card>
        <CardContent className="space-y-8 py-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="relative group w-32 h-32 mx-auto">
              {/* Avatar component */}
              <div className="relative group w-fit mx-auto cursor-pointer" onClick={handleAvatarClick}>
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

            {/* Editable Fields */}
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone Number", name: "phone", type: "text" },
              { label: "Store Name", name: "storeName", type: "text" },
              {
                label: "Business Address",
                name: "businessAddress",
                type: "text",
              },
            ].map(({ label, name, type }) => (
              <div className="relative" key={name}>
                <label className="font-medium text-sm">{label}</label>
                <Input
                  {...register(name)}
                  ref={refs[name]}
                  readOnly={!editMode[name]}
                  type={type}
                  placeholder={label}
                  className="h-12 text-base mt-1 border-0 border-b border-gray-300 focus:border-black focus:ring-0 focus:outline-none"
                />
                <Pencil
                  className="absolute top-8 right-3 h-4 w-4 cursor-pointer text-gray-500"
                  onClick={() => enableEdit(name)}
                />
              </div>
            ))}

            {/* Bio */}
            <div className="relative">
              <label className="font-medium text-sm">Bio</label>
              <Textarea
                {...register("bio")}
                ref={refs.bio}
                readOnly={!editMode.bio}
                placeholder="Your seller bio"
                className="text-base mt-1 border-0 border-b border-gray-300 focus:border-black focus:ring-0 focus:outline-none resize-none"
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
