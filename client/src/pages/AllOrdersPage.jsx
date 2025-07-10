import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { axiosInstance } from "@/lib/axiosInstance";
import { backendRoutes } from "@/helpers/backendRoutes";
import { format } from "date-fns";

const AllOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axiosInstance.get(
        `${backendRoutes.ORDER.BASE}${backendRoutes.ORDER.GET_ALL_ORDERS}`,
        { withCredentials: true }
      );
      setOrders(res.data.data || []);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="max-w-6xl mx-auto py-10 px-6 space-y-8">
      <h1 className="text-3xl font-bold">All Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found.</p>
      ) : (
        orders.map((order) => (
          <Card key={order._id} className="shadow-md">
            <CardContent className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order ID: <span className="text-gray-600">{order._id}</span>
                  </h2>
                  <p className="text-sm text-gray-500">
                    Created at: {format(new Date(order.createdAt), "PPpp")}
                  </p>
                </div>
                <Badge className="text-sm">{order.status}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Buyer Info</h3>
                  <p className="text-sm text-gray-700">
                    {order.user?.name} ({order.user?.email})
                  </p>
                </div>

                <div>
                  <h3 className="font-medium">Payment Method</h3>
                  <p className="text-sm text-gray-700">{order.paymentMethod}</p>
                </div>

                <div>
                  <h3 className="font-medium">Cart Total</h3>
                  <p className="text-sm text-gray-700">Rs. {order.cartTotal}</p>
                </div>

                <div>
                  <h3 className="font-medium">Delivery Info</h3>
                  <p className="text-sm text-gray-700">
                    {order.deliveryInfo?.firstName} {order.deliveryInfo?.lastName},<br />
                    {order.deliveryInfo?.street}, {order.deliveryInfo?.city},<br />
                    {order.deliveryInfo?.state}, {order.deliveryInfo?.zipCode},<br />
                    {order.deliveryInfo?.country}<br />
                    📞 {order.deliveryInfo?.phone}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-medium">Order Details</h3>
                <div className="space-y-2">
                  {order.products.map((item, idx) => (
                    <div
                      key={idx}
                      className="text-sm bg-gray-50 border rounded-md p-2"
                    >
                      <p>
                        <strong>Product:</strong> {item.productId?.name}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Seller:</strong>{" "}
                        {item.sellerId?.shopName || item.sellerId?.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default AllOrdersPage;
