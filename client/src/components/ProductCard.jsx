import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import appUtils from "@/lib/appUtils";
import { RouteCart, RouteCollection } from "@/helpers/routesName";
import { addToCart } from "@/store/slices/cartSlice";
import { showToast } from "./shared/showToast";

const ProductCard = ({ product }) => {
  const { navigate, dispatch } = appUtils();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    showToast({
      message: "Product added to cart!",
      description: `${product.productName} has been added to your cart.`,
      type: "success",
      actionLabel: "View Cart",
      onActionClick: () => navigate(RouteCart),
    });
  };

  const handleNavigate = () => {
    navigate(`${RouteCollection}/${product.category}/${product._id}`);
  };

  const displayPrice = product.offerPrice || product.price;
  const originalPrice = product.offerPrice ? product.price : null;
  const sellerName = product.seller?.shopName || "Unknown Seller";
  const image = product.images?.[0];

  return (
    <Card className="h-full flex flex-col hover:shadow-xl transition-shadow">
      <CardContent className="p-2">
        {/* Image */}
        <AspectRatio
          ratio={3 / 4}
          className="bg-muted rounded-md overflow-hidden group cursor-pointer"
          onClick={handleNavigate}
        >
          <img
            src={image}
            alt={product.productName}
            className="object-cover w-full h-full transition-transform duration-200 ease-in-out group-hover:scale-110"
          />
        </AspectRatio>

        {/* Content */}
        <div className="mt-2 space-y-1">
          {/* Product Name */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p
                  className="text-base font-semibold line-clamp-1 cursor-pointer"
                  onClick={handleNavigate}
                >
                  {product.productName}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{product.productName}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Description */}
          <p className="text-sm text-muted-foreground line-clamp-1">
            {product.description}
          </p>

          {/* Seller */}
          <p   onClick={() => navigate(`/seller/${product.seller?._id || product.seller}`)} className="text-sm text-muted-foreground italic font-semibold cursor-pointer hover:underline">
            Seller: {sellerName}
          </p>

          {/* Pricing */}
          <div className="flex items-center gap-2 text-base font-semibold">
            <span>${displayPrice}</span>
            {originalPrice && (
              <span className="line-through text-muted-foreground text-sm">
                ${originalPrice}
              </span>
            )}
          </div>

          {/* Badge */}
          {product.badge && (
            <Badge variant="secondary">{product.badge}</Badge>
          )}
        </div>
      </CardContent>

      {/* Footer */}
      <CardFooter className="mt-auto flex justify-between items-center px-2 pb-2 gap-4">
        <span className="text-base">⭐ {product.rating || "N/A"}</span>
        <Button
          onClick={handleAddToCart}
          size="sm"
          className="hover:bg-black cursor-pointer"
        >
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
