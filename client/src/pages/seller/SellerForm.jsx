import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { sellerAuthSchema } from "@/schemas/seller/sellerAuthSchema";

const SellerForm = () => {
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
    }
  });

  const onSubmit = (data) => {
    console.log("Seller Form Data:", data);
    // send to backend
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 bg-white">
      <Card className="w-full max-w-3xl p-6 sm:p-10">
        <CardHeader>
          <CardTitle className="text-3xl sm:text-4xl font-bold text-center">Become a Seller</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="shopName" className="text-lg">Shop Name</Label>
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
              <Label htmlFor="gstNumber" className="text-lg">GST/VAT Number</Label>
              <Input
                id="gstNumber"
                className="text-base"
                {...register("gstNumber", { required: true })}
              />
              {errors.gstNumber && (
                <p className="text-red-500 text-sm">GST/VAT Number is required</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address" className="text-lg">Business Address</Label>
              <Textarea
                id="address"
                rows={4}
                className="text-base"
                {...register("address", { required: true })}
              />
              {errors.address && (
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
