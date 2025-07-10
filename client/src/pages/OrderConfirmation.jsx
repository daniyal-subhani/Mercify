import React, { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "@/lib/axiosInstance";
import { backendRoutes } from "@/helpers/backendRoutes";
import { RouteCollection, RouteUserOrders } from "@/helpers/routesName";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axiosInstance.get(
          `${backendRoutes.ORDER.BASE}${backendRoutes.ORDER.GET_ORDER_BY_ID}/${orderId}`
        );
        setOrder(res.data.data); 
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  if (!order) return <p className="text-center py-20">Loading order...</p>;

  const { deliveryInfo, cartTotal, paymentMethod, _id, createdAt, user } =
    order;

  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-center space-y-10">
      <CheckCircle2 className="w-20 h-20 text-green-600 mx-auto" />

      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Thank You for Your Order!
        </h1>
        <p className="text-xl text-muted-foreground">
          A confirmation email has been sent to{" "}
          <span className="font-semibold text-foreground">
            {deliveryInfo?.email || user?.email}
          </span>
        </p>
      </div>

      <div className="text-left space-y-5 border-t pt-10 max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold">Order Summary</h2>
        <p className="text-lg">
          <span className="font-medium">Order ID:</span> {_id}
        </p>
        <p className="text-lg">
          <span className="font-medium">Total Amount:</span>{" "}
          {cartTotal ? `$${cartTotal.toFixed(2)}` : "N/A"}
        </p>
        <p className="text-lg">
          <span className="font-medium">Delivery Address:</span>{" "}
          {deliveryInfo
            ? `${deliveryInfo.street}, ${deliveryInfo.city}, ${deliveryInfo.state}, ${deliveryInfo.zipCode}, ${deliveryInfo.country}`
            : "N/A"}
        </p>
        <p className="text-lg">
          <span className="font-medium">Payment Method:</span> {paymentMethod}
        </p>
        <p className="text-lg">
          <span className="font-medium">Estimated Delivery:</span>{" "}
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex justify-center gap-6 pt-12">
        <Button
          onClick={() => navigate(RouteCollection)}
          className="h-12 px-6 text-base font-medium"
        >
          Continue Shopping
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate(RouteUserOrders)}
          className="h-12 px-6 text-base font-medium"
        >
          View My Orders
        </Button>
      </div>
    </div>
  );
};

export default OrderConfirmation;
