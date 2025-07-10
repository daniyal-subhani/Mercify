import React, { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";
import { backendRoutes } from "@/helpers/backendRoutes";
import { Badge } from "@/components/ui/badge"; // Optional if you want status styling

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axiosInstance.get(
          `${backendRoutes.ORDER.BASE}${backendRoutes.ORDER.GET_ORDER_BY_USER}`,
          { withCredentials: true }
        );
        
        setOrders(res.data.data || []);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="text-center py-20">Loading your orders...</p>;
  if (orders.length === 0) return <p className="text-center py-20">No orders found.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold text-center md:text-left">Your Orders</h1>

      {orders.map((order) => (
        <div
          key={order._id}
          className="border rounded-2xl p-6 shadow-md space-y-4 bg-white"
        >
          <div className="text-sm text-muted-foreground">
            <p>
              <span className="font-semibold">Order ID:</span> {order._id}
            </p>
            <p>
              <span className="font-semibold">Placed on:</span>{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {order.products.map((item, index) => (
              <div
                key={`${order._id}-${item._id || index}`}
                className="border p-4 rounded-lg bg-gray-50 shadow-sm space-y-1"
              >
                <h2 className="font-semibold text-lg">
                  {item.productId?.productName ?? "Unnamed Product"}
                </h2>
                <p>
                  <span className="font-medium">Quantity:</span> {item.quantity}
                </p>
                <p>
                  <span className="font-medium">Price:</span>{" "}
                  ${Number(item.productId?.price || 0).toFixed(2)}
                </p>
                <p>
                  <span className="font-medium">Seller:</span>{" "}
                  {item.sellerId?.shopName ?? "Unknown Seller"} (
                  {item.sellerId?.email ?? "N/A"})
                </p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 text-sm text-muted-foreground space-y-1">
            <p>
              <span className="font-medium">Total:</span>{" "}
              ${Number(order.cartTotal || 0).toFixed(2)}
            </p>
            <p>
              <span className="font-medium">Payment Method:</span>{" "}
              {order.paymentMethod ?? "N/A"}
            </p>
            <p>
              <span className="font-medium">Status:</span>{" "}
              {order.status ? (
                <Badge variant="default" className="text-xs">{order.status}</Badge>
              ) : (
                "N/A"
              )}
            </p>
            <p>
              <span className="font-medium">Shipping Address:</span>{" "}
              {order.deliveryInfo?.street}, {order.deliveryInfo?.city},{" "}
              {order.deliveryInfo?.state}, {order.deliveryInfo?.zipCode},{" "}
              {order.deliveryInfo?.country}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserOrders;
