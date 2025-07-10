import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { axiosInstance } from "@/lib/axiosInstance";
import { backendRoutes } from "@/helpers/backendRoutes";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  useEffect(() => {
    const fetchSellerOrders = async () => {
      try {
        const res = await axiosInstance.get(
          `${backendRoutes.ORDER.BASE}${backendRoutes.ORDER.GET_ORDER_BY_SELLER}`,
          { withCredentials: true }
        );

        setOrders(res.data.orders || []);
      } catch (error) {
        console.error("Failed to fetch seller orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSellerOrders();
  }, []);

  if (loading)
    return <p className="text-center py-20">Loading seller orders...</p>;
  if (orders.length === 0)
    return <p className="text-center py-20">No orders found.</p>;

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Your Orders (as Seller)</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="flex flex-col gap-4 md:grid md:grid-cols-[2fr_2fr_1fr_1fr] items-start border border-gray-200 p-6 rounded-xl bg-white shadow-sm"
        >
          {/* Product Info */}
          <div className="flex items-start gap-4">
            <img
              src={boxIcon}
              alt="Order"
              className="w-14 h-14 object-cover opacity-60"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Order ID: <span className="text-black">{order._id}</span>
              </p>
              {order.products.map((item, idx) => (
                <p key={idx} className="text-gray-700">
                  {item.productId?.productName ?? "Unnamed Product"}{" "}
                  {item.quantity > 1 && (
                    <span className="text-indigo-500">× {item.quantity}</span>
                  )}
                </p>
              ))}
            </div>
          </div>

          {/* Buyer Info */}
          <div className="text-sm text-gray-700 leading-snug">
            <p className="font-medium">
              Buyer: {order.user?.name ?? "Unknown"} ({order.user?.email})
            </p>
            <p>
              {order.deliveryInfo?.street}, {order.deliveryInfo?.city},{" "}
              {order.deliveryInfo?.state} {order.deliveryInfo?.zipCode},{" "}
              {order.deliveryInfo?.country}
            </p>
          </div>

          {/* Amount */}
          <div className="text-base font-semibold text-gray-800">
            ${Number(order.cartTotal || 0).toFixed(2)}
          </div>

          {/* Payment Info */}
          <div className="text-sm text-gray-700 space-y-1">
            <p>Method: {order.paymentMethod}</p>
            <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p>
              Payment:{" "}
              <Badge
                variant={order.status === "Paid" ? "default" : "destructive"}
                className="text-xs"
              >
                {order.status ?? "Pending"}
              </Badge>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SellerOrders;
