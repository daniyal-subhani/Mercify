import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Mail, MapPin, ShoppingBag } from "lucide-react";

const UserPublicProfile = ({ user }) => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <Card className="rounded-xl shadow-md">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.image || "/default-avatar.jpg"} />
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">@{user.username}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail size={16} />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} />
              <span>{user.location || "Location not provided"}</span>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-base mb-2">Bio</h3>
            <p className="text-sm text-gray-600">{user.bio || "No bio available."}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserPublicProfile;
