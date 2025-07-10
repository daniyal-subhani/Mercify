import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MapPin, BadgeCheck } from "lucide-react";
import { getUserProfile } from "@/api/userApi";
import { useParams } from "react-router-dom";

const UserPublicProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserFromDB = async () => {
      try {
        const userData = await getUserProfile(id);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserFromDB();
  }, [id]);

  if (!user) return <p className="text-center py-10 text-lg text-gray-500">Loading user...</p>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <Card className="rounded-2xl shadow-lg border border-gray-200">
        <CardContent className="p-8 space-y-8">
          {/* Header */}
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 ring-2 ring-indigo-500 shadow-md">
              <AvatarImage src={user.profilePicture || ""} alt={user.name || "User Avatar"} />
              <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xl font-bold">
                {user.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
              <p className="text-sm text-muted-foreground">@{user.username || "username"}</p>
              <div className="mt-1 flex items-center gap-1 text-indigo-600 text-sm font-medium">
                <BadgeCheck size={16} />
                {user.role?.toUpperCase() || "USER"}
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-lg text-gray-600">
              <Mail size={18} />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-3 text-lg text-gray-600">
              <MapPin size={18} />
              <span>{user.location || "Location not provided"}</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Bio</h3>
            <p className="text-base text-gray-600 leading-relaxed">
              {user.bio || "No bio available."}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPublicProfile;
