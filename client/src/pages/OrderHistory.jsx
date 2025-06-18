import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

const mockOrders = [
  {
    orderId: "ORD123456",
    date: "2025-06-10",
    total: 125.99,
    status: "Delivered",
  },
  {
    orderId: "ORD123457",
    date: "2025-06-08",
    total: 89.5,
    status: "Processing",
  },
];

const OrderHistory = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <h1 className="text-4xl font-bold">My Orders</h1>
      <Separator />

      {mockOrders.length === 0 ? (
        <p className="text-muted-foreground text-lg">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-6">
          {mockOrders.map((order) => (
            <Card key={order.orderId} className="p-6 shadow-sm">
              <CardContent className="p-0 space-y-4">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <p className="text-lg font-medium">
                      Order ID: <span className="text-foreground">{order.orderId}</span>
                    </p>
                    <p className="text-muted-foreground">Placed on {order.date}</p>
                  </div>

                  <div className="text-right space-y-2">
                    <p className="text-xl font-semibold">${order.total.toFixed(2)}</p>
                    <Badge
                      variant={order.status === "Delivered" ? "default" : "outline"}
                      className={
                        order.status === "Delivered"
                          ? "bg-green-600 hover:bg-green-700 text-white"
                          : "bg-yellow-500 hover:bg-yellow-600 text-white"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>

                <div className="text-right">
                  <Button
                    variant="outline"
                    onClick={() => navigate(`/orders/${order.orderId}`)}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
