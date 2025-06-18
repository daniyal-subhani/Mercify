import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  const mockOrder = {
    orderId: "ORD123456789",
    total: 158,
    email: "johndoe@example.com",
    deliveryAddress: "123 Main St, Lahore, Punjab, Pakistan",
    estimatedDelivery: "3–5 business days",
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-10">
      <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto" />
      
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Thank You for Your Order!
        </h1>
        <p className="text-xl text-muted-foreground">
          A confirmation email has been sent to{" "}
          <span className="font-semibold text-foreground">{mockOrder.email}</span>
        </p>
      </div>

      <div className="text-left space-y-5 border-t pt-10 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold">Order Summary</h2>
        <p className="text-lg">
          <span className="font-medium">Order ID:</span> {mockOrder.orderId}
        </p>
        <p className="text-lg">
          <span className="font-medium">Total Amount:</span> ${mockOrder.total.toFixed(2)}
        </p>
        <p className="text-lg">
          <span className="font-medium">Delivery Address:</span>{" "}
          {mockOrder.deliveryAddress}
        </p>
        <p className="text-lg">
          <span className="font-medium">Estimated Delivery:</span>{" "}
          {mockOrder.estimatedDelivery}
        </p>
      </div>

      <div className="flex justify-center gap-6 pt-12">
        <Button
          onClick={() => navigate("/")}
          className="h-12 px-6 text-base font-medium"
        >
          Continue Shopping
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate("/orders")}
          className="h-12 px-6 text-base font-medium"
        >
          View My Orders
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
