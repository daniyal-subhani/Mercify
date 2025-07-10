import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellerAuthSchema } from "@/schemas/seller/sellerAuthSchema";
import { axiosInstance } from "@/lib/axiosInstance";
import { backendRoutes } from "@/helpers/backendRoutes";
import { showToast } from "@/components/shared/showToast";
import { useNavigate } from "react-router-dom";

const SellerForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(sellerAuthSchema),
   defaultValues: {
  shopName: "",
  GSTNumber: "",        
  businessAddress: "",   
},

  });

  const onSubmit = async (sellerData) => {
    try {
      const response = await axiosInstance.post(
        `${backendRoutes.BECOME_SELLER.BASE}${backendRoutes.BECOME_SELLER.BECOME_SELLER}`,
        sellerData
      );
      if (response.status === 201) {
        showToast({
          type: "success",
          message: "Seller registered successfully",
          actionLabel: "View profile",
          onActionClick: () => {
            navigate("/seller/profile");
          }
          
        })
      }
      return response.data;
    } catch (error) {
      return error.response.data.message;
    }
  };
  const onError = (error) => {
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 bg-white">
      <Card className="w-full max-w-3xl p-6 sm:p-10">
        <CardHeader>
          <CardTitle className="text-3xl sm:text-4xl font-bold text-center">
            Become a Seller
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="shopName" className="text-lg">
                Shop Name
              </Label>
              <Input
                id="shopName"
                className="text-base"
                {...register("shopName", { required: true })}
              />
              {errors.shopName && (
                <p className="text-red-500 text-sm">Shop Name is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="gstNumber" className="text-lg">
                GST/VAT Number
              </Label>
              <Input
                id="gstNumber"
                className="text-base"
                {...register("GSTNumber", { required: true })}
              />
              {errors.GSTNumber && (
                <p className="text-red-500 text-sm">
                  GST/VAT Number is required
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-lg">
                Business Address
              </Label>
              <Textarea
                id="address"
                rows={4}
                className="text-base"
                {...register("businessAddress", { required: true })}
              />
              {errors.businessAddress && (
                <p className="text-red-500 text-sm">Address is required</p>
              )}
            </div>

            <Button type="submit" size="lg" className="w-full text-base">
              Submit Application
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerForm;
