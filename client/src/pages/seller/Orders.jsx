import React from "react";
import { Badge } from "@/components/ui/badge";

const Orders = () => {
  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  const orders = [
    {
      id: "ORD123",
      items: [
        {
          product: { name: "Nike Air Max 270" },
          quantity: 2,
        },
      ],
      address: {
        firstName: "John",
        lastName: "Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipcode: "10001",
        country: "USA",
      },
      amount: 320.0,
      paymentType: "Credit Card",
      orderDate: "10/10/2022",
      isPaid: true,
    },
    {
      id: "ORD124",
      items: [
        {
          product: { name: "Adidas Ultra Boost" },
          quantity: 1,
        },
      ],
      address: {
        firstName: "Jane",
        lastName: "Smith",
        street: "456 Oak St",
        city: "Los Angeles",
        state: "CA",
        zipcode: "90001",
        country: "USA",
      },
      amount: 280.0,
      paymentType: "Cash on Delivery",
      orderDate: "12/10/2022",
      isPaid: false,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Orders</h1>

      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col gap-4 md:grid md:grid-cols-[2fr_2fr_1fr_1fr] items-start border border-gray-200 p-6 rounded-xl bg-white shadow-sm"
        >
          {/* Product Info */}
          <div className="flex items-start gap-4">
            <img
              src={boxIcon}
              alt="Product"
              className="w-14 h-14 object-cover opacity-60"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">
                Order ID: <span className="text-black">{order.id}</span>
              </p>
              {order.items.map((item, idx) => (
                <p key={idx} className="text-gray-700">
                  {item.product.name}
                  {item.quantity > 1 && (
                    <span className="text-indigo-500"> × {item.quantity}</span>
                  )}
                </p>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="text-sm text-gray-700 leading-snug">
            <p className="font-medium">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state} {order.address.zipcode},{" "}
              {order.address.country}
            </p>
          </div>

          {/* Amount */}
          <div className="text-base font-semibold text-gray-800">
            ${order.amount.toFixed(2)}
          </div>

          {/* Payment Info */}
          <div className="text-sm text-gray-700 space-y-1">
            <p>Method: {order.paymentType}</p>
            <p>Date: {order.orderDate}</p>
            <p>
              Payment:{" "}
              <Badge
                variant={order.isPaid ? "default" : "destructive"}
                className="text-xs"
              >
                {order.isPaid ? "Paid" : "Pending"}
              </Badge>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
