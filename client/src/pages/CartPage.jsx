import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, ArrowLeft } from "lucide-react";

import CartTotal from "@/components/cartTotal";
import { updateQuantity, removeFromCart } from "@/store/slices/cartSlice";
import { showToast } from "@/components/shared/showToast";
import { RouteCollection } from "@/helpers/routesName";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth?.user);
  const sizes = useSelector((state) => state.productMetaData?.sizes || []);
  const categories = useSelector(
    (state) => state.productMetaData?.categories || []
  );
  const subCategories = useSelector(
    (state) => state.productMetaData?.subCategories || []
  );
  const cart = useSelector((state) =>
    state.cart.cartItems.filter((item) => item.userId === user?._id)
  );


  const getLabelById = (array, id) => {
    if (!Array.isArray(array)) return "Unknown";
    return array.find((item) => item._id === id)?.name || "Unknown";
  };

  const handleRemoveFromCart = (product) => {
    dispatch(
      removeFromCart({
        _id: product._id,
        userId: user?._id,
        selectedSizeId: product.selectedSizeId,
      })
    );
    showToast({
      message: "Product removed from cart!",
      description: `${product.productName} has been removed from your cart.`,
      type: "success",
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 py-16 max-w-6xl w-full px-4 mx-auto">
      <div className="flex-1">
        <h1 className="text-3xl font-semibold mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-indigo-500">({cart.length} items)</span>
        </h1>

        <div className="hidden md:grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-sm font-medium pb-3">
          <p>Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cart.map((product) => (
          <div
            key={product._id}
            className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] items-center border-b py-4 gap-4"
          >
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 border rounded overflow-hidden">
                <img
                  src={product.images?.[0]}
                  alt={product.productName}
                  className="object-cover w-full h-full"
                />
              </div>
              <div>
                <p className="font-medium text-base">{product.productName}</p>

                <p className="text-sm text-gray-500">
                  Size: {getLabelById(sizes, product.selectedSizeId)}
                </p>
                <p className="text-sm text-gray-500">
                  Category: {getLabelById(categories, product.category)}
                </p>
                <p className="text-sm text-gray-500">
                  Subcategory:{" "}
                  {getLabelById(subCategories, product.subCategory)}
                </p>
                <p className="text-sm text-gray-500">Seller: {product.seller?.shopName}</p>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-gray-500">Qty:</span>
                  <Select
                    value={String(product.quantity)}
                    onValueChange={(value) =>
                      dispatch(
                        updateQuantity({
                          _id: product._id,
                          quantity: Number(value),
                          userId: user?._id,
                          selectedSizeId: product.selectedSizeId,
                        })
                      )
                    }
                  >
                    <SelectTrigger className="w-16 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <SelectItem key={qty} value={String(qty)}>
                          {qty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <p className="text-center font-medium text-sm md:text-base">
              ${product.price * product.quantity}
            </p>

            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveFromCart(product)}
              >
                <Trash2 className="text-destructive w-5 h-5" />
              </Button>
            </div>
          </div>
        ))}

        <Button
          variant="link"
          className="mt-6 text-indigo-500 px-0"
          onClick={() => navigate(RouteCollection)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
        </Button>
      </div>

      <div className="w-full h-[400px] mx-auto max-w-sm">
        <CartTotal buttonText={"Proceed to Checkout"} />
      </div>
    </div>
  );
};

export default CartPage;
