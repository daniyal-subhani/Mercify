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


const ProductCard = ({ product, onAddToCart }) => {
  const { navigate , dispatch} = appUtils();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    showToast({
      message: "Product added to cart!",
      description: `${product.name} has been added to your cart.`,
      type: "success",
      actionLabel: "View Cart",
      onActionClick: () => navigate(RouteCart),
    })

  };

  const handleNavigate = () => {
    navigate(`${RouteCollection}/${product.category}/${product._id}`);


  };

  return (
    <Card className="h-full flex flex-col hover:shadow-xl transition-shadow">
      <CardContent className="p-2">
        {/* Clickable Image */}
        <AspectRatio
          ratio={3 / 4}
          className="bg-muted rounded-md overflow-hidden group cursor-pointer"
          onClick={handleNavigate}
        >
          <img
            src={product.image[0]}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-200 ease-in-out group-hover:scale-110"
          />
        </AspectRatio>

        <div className="mt-2 space-y-1">
          {/* Clickable Name */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <p
                  className="text-sm font-medium line-clamp-1 cursor-pointer"
                  onClick={handleNavigate}
                >
                  {product.name}
                </p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{product.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {product.badge && <Badge variant="secondary">{product.badge}</Badge>}

          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>${product.price}</span>
            {product.oldPrice && (
              <span className="line-through text-muted-foreground text-xs">
                ${product.oldPrice}
              </span>
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="mt-auto flex justify-between items-center px-2 pb-2">
        <span className="text-sm">⭐ {product.rating || "N/A"}</span>
        <Button onClick={handleAddToCart} size="sm" className="hover:bg-black">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};


export default ProductCard;
