import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Mail, MapPin, ShoppingBag, Store } from "lucide-react";

const SellerPublicProfile = ({ seller }) => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <Card className="rounded-xl shadow-md">
        <CardContent className="p-6 space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={seller.image || "/default-avatar.jpg"} />
            </Avatar>
            <div>
              <h2 className="text-2xl font-semibold">{seller.name}</h2>
              <p className="text-sm text-muted-foreground">@{seller.username}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Store size={16} />
                <span>{seller.storeName || "Store name not provided"}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail size={16} />
              <span>{seller.email}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin size={16} />
              <span>{seller.businessAddress || "Business address not provided"}</span>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-base mb-2">About the Seller</h3>
            <p className="text-sm text-gray-600">{seller.bio || "No bio available."}</p>
          </div>

          <div>
            <h3 className="font-medium text-base mb-2">Products</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {(seller.products || []).map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  <img
                    src={product.image[0] || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-2">
                    <h4 className="text-sm font-medium truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerPublicProfile;
