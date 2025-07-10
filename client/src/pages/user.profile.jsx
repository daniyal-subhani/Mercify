
import { useForm } from "react-hook-form";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Save, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { backendRoutes } from "@/helpers/backendRoutes";
import { userProfileData } from "@/hooks/profilesData";

const UserProfilePage = () => {
  const { profileData, loading, error, refetch } = userProfileData();
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef(null);
  const [previewImage, setPreviewImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      bio: "",
    },
  });

  useEffect(() => {
    if (profileData) {
      reset({
        name: profileData.name || "",
        email: profileData.email || "",
        bio: profileData.bio || "",
      });
      setPreviewImage(profileData.profilePicture || "");
    }
  }, [profileData, reset]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (data) => {
    try {
      setIsSaving(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("bio", data.bio);
      if (selectedFile) {
        formData.append("profilePicture", selectedFile);
      }

      await axiosInstance.put(
        `${backendRoutes.PROFILE.BASE}${backendRoutes.PROFILE.UPDATE}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      await refetch();
    } catch (err) {
      console.error("Profile update failed:", err);
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Your Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <Card>
          <CardContent className="space-y-4 mt-4">
            {/* Avatar */}
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={previewImage} alt="profile" />
                <AvatarFallback>{profileData?.name?.[0]}</AvatarFallback>
              </Avatar>
              <div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  onClick={triggerFileSelect}
                  variant="outline"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Image
                </Button>
              </div>
            </div>

            {/* Name */}
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register("name", { required: true })} />
              {errors.name && (
                <p className="text-red-500 text-sm">Name is required</p>
              )}
            </div>

            {/* Email */}
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">Email is required</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" rows={4} {...register("bio")} />
            </div>
          </CardContent>

          <CardFooter className="justify-end">
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default UserProfilePage;
