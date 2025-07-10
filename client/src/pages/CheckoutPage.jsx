import React from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle } from "lucide-react";
import appUtils from "@/lib/appUtils";
import CartTotal from "@/components/CartTotal";
import { RouteOrderConfirmation } from "@/helpers/routesName";
import { zodResolver } from "@hookform/resolvers/zod";
import { deliveryFormSchema } from "@/schemas/diliveryFormSchema";
import { axiosInstance } from "@/lib/axiosInstance";
import { backendRoutes } from "@/helpers/backendRoutes";
import { useSelector, useDispatch } from "react-redux";
import { calculateCartTotals } from "@/lib/cartUtils";
import { clearCart } from "@/store/slices/cartSlice";

const CheckoutPage = () => {
  const { navigate } = appUtils();
  const dispatch = useDispatch();

  // Get cart items from Redux
  const cartItems = useSelector((state) => state.cart.cartItems);
  const safeCart = Array.isArray(cartItems) ? cartItems : [];

  // Calculate total from cart items
  const { total } = calculateCartTotals(safeCart);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(deliveryFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    const deliveryInfo = { ...data };

    const payload = {
      deliveryInfo,
      cartTotal: total,
      cartItems: safeCart.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
      paymentMethod: "COD",
    };

    try {
      const res = await axiosInstance.post(
        `${backendRoutes.ORDER.BASE}${backendRoutes.ORDER.CREATE_ORDER}`,
        payload,
        { withCredentials: true }
      );

      dispatch(clearCart());
 navigate(`/order-confirmation/${res.data.order._id}`);

    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  const onError = (errors) => {
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* LEFT: Delivery Form */}
      <form
        id="checkout-form"
        className="space-y-6"
        onSubmit={handleSubmit(onSubmit, onError)}
      >
        <h2 className="text-3xl font-bold mb-6">Delivery Information</h2>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Input
              {...register("firstName")}
              placeholder="First Name"
              className="h-14 text-lg px-4"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("lastName")}
              placeholder="Last Name"
              className="h-14 text-lg px-4"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Input
            {...register("email")}
            type="email"
            placeholder="Email Address"
            className="h-14 text-lg px-4"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Input
            {...register("street")}
            placeholder="Street"
            className="h-14 text-lg px-4"
          />
          {errors.street && (
            <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Input
              {...register("city")}
              placeholder="City"
              className="h-14 text-lg px-4"
            />
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>
          <div>
            <Input
              {...register("state")}
              placeholder="State"
              className="h-14 text-lg px-4"
            />
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Input
              {...register("zipCode")}
              placeholder="Zipcode"
              className="h-14 text-lg px-4"
            />
            {errors.zipCode && (
              <p className="text-red-500 text-sm mt-1">
                {errors.zipCode.message}
              </p>
            )}
          </div>
          <div>
            <Input
              {...register("country")}
              placeholder="Country"
              className="h-14 text-lg px-4"
            />
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <Input
            {...register("phone")}
            placeholder="Phone"
            className="h-14 text-lg px-4"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>
      </form>

      {/* RIGHT: Cart Summary + Payment */}
      <div className="space-y-10">
        <CartTotal buttonText="Place Order" />

        <Card className="border-none relative shadow-none p-0">
          <CardContent className="space-y-6 p-0 relative left-16">
            <h2 className="text-2xl font-semibold">Payment Method</h2>

            <RadioGroup defaultValue="COD" className="space-y-4">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="COD" id="cod" />
                <label htmlFor="cod" className="text-base font-medium">
                  Cash on Delivery
                </label>
              </div>

              <div className="flex items-center space-x-3 opacity-50">
                <RadioGroupItem value="stripe" id="stripe" disabled />
                <label htmlFor="stripe" className="text-base font-medium">
                  Stripe (Coming Soon)
                </label>
              </div>
            </RadioGroup>

            <Separator />

            <Button
              type="submit"
              form="checkout-form"
              className="w-full h-14 text-lg font-semibold"
            >
              <CheckCircle className="mr-2 h-5 w-5" /> Place Order
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CheckoutPage;
