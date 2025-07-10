import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "@/lib/axiosInstance";
import { backendRoutes } from "@/helpers/backendRoutes";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, MapPin, BadgeCheck, Store } from "lucide-react";

const SellerPublicProfilePage = () => {
  const { sellerId } = useParams();
  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSellerProfile = async () => {
      try {
        const res = await axiosInstance.get(
          `${backendRoutes.PUBLIC_PROFILES.BASE}${backendRoutes.PUBLIC_PROFILES.SELLER}/${sellerId}`
        );
        setSeller(res.data.data.seller);
        setProducts(res.data.data.products || []);
      } catch (error) {
        console.error("Failed to load seller profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerProfile();
  }, [sellerId]);

  if (loading) return <p className="text-center py-10 text-lg text-gray-500">Loading seller profile...</p>;
  if (!seller) return <p className="text-center py-10 text-lg text-red-500">Seller not found.</p>;

  const profilePic = seller.user?.profilePicture || "";
  const bio = seller.user?.bio || "No bio provided.";
  const name = seller.user?.name || "Seller";
  const email = seller.user?.email || "Not available";

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 space-y-10">
      {/* Seller Info Card */}
      <Card className="rounded-2xl shadow-lg border border-gray-200">
        <CardContent className="p-8 space-y-8">
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24 ring-2 ring-indigo-500 shadow-md">
              <AvatarImage src={profilePic} alt={name} />
              <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xl font-bold">
                {name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-3xl font-bold text-gray-800">{seller.shopName}</h2>
              <p className="text-sm text-muted-foreground">Owned by {name}</p>
              <div className="mt-1 flex items-center gap-1 text-indigo-600 text-sm font-medium">
                <BadgeCheck size={16} />
                VERIFIED SELLER
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3 text-gray-600">
            <div className="flex items-center gap-3 text-lg">
              <Mail size={18} />
              <span>{email}</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <MapPin size={18} />
              <span>{seller.businessAddress}</span>
            </div>
            <div className="flex items-center gap-3 text-lg">
              <Store size={18} />
              <span>GST#: {seller.GSTNumber}</span>
            </div>
          </div>

          {/* Bio */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">About the Seller</h3>
            <p className="text-base text-gray-600 leading-relaxed">{bio}</p>
          </div>
        </CardContent>
      </Card>

      {/* Products Grid */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Products by {seller.shopName}
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Card key={product._id} className="rounded-lg border shadow-sm overflow-hidden">
              <img
                src={product.images?.[0] || "/placeholder.jpg"}
                alt={product.productName}
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-4 space-y-2">
                <p className="font-medium text-lg">{product.productName}</p>
                <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <p className="text-indigo-600 font-semibold">${product.offerPrice}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SellerPublicProfilePage;
