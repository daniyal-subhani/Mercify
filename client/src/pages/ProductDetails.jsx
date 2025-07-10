import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import ProductCard from "@/components/ProductCard";
import { axiosInstance } from "@/lib/axiosInstance";
import { backendRoutes } from "@/helpers/backendRoutes";
import { addToCart } from "@/store/slices/cartSlice";
import { showToast } from "@/components/shared/showToast";

const ProductDetails = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sizeOptions = useSelector(
    (state) => state.productMetaData?.sizes || []
  );
  const user = useSelector((state) => state.auth?.user);

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [activeTab, setActiveTab] = useState("description");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosInstance.get(
          `${backendRoutes.PRODUCT.BASE}${backendRoutes.PRODUCT.GET_PRODUCT}/${id}`
        );
        setProduct(res.data.data.product);
        setRelated(res.data.data.relatedProducts);
      } catch (error) {
        console.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  const {
    images,
    productName,
    productDescription,
    price,
    offerPrice,
    subCategory,
    sizes = [],
    rating = 0,
    reviews = [],
  } = product;

  const displayPrice = offerPrice || price;

  const handleAddToCart = () => {
    if (sizes.length && !selectedSize) return;

    if (!user?._id) {
      return showToast({
        message: "You need to login",
        description: "Please login to add items to cart",
        type: "error",
      });
    }

    dispatch(
      addToCart({
        ...product,
        size: selectedSize,
        userId: user._id,
      })
    );

    showToast({
      message: "Product added to cart!",
      description: `${productName} has been added to your cart.`,
      type: "success",
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Images */}
        <div className="flex flex-col lg:flex-row gap-4 w-full">
          <div className="order-2 lg:order-1 flex lg:flex-col gap-3 justify-center lg:justify-start">
            {images.slice(0, 5).map((src, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImage(idx)}
                className={`w-20 h-20 rounded-md overflow-hidden ${
                  selectedImage === idx ? "ring-2 ring-indigo-600" : ""
                }`}
              >
                <img
                  src={src}
                  alt={`thumb-${idx}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
          <div className="order-1 lg:order-2 flex-1 w-full">
            <img
              src={images[selectedImage]}
              alt={productName}
              className="w-full h-auto max-h-[500px] object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <h1 className="text-4xl font-semibold text-gray-900">
            {productName}
          </h1>

          <div className="flex items-center gap-2">
            {[...Array(Math.round(rating))].map((_, i) => (
              <Star key={i} fill="currentColor" className="text-yellow-500" />
            ))}
            <span className="text-base text-gray-600">({reviews.length})</span>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-3xl font-bold text-indigo-600">
              ${displayPrice}
            </span>
            {offerPrice && (
              <span className="text-xl line-through text-gray-400">
                ${price}
              </span>
            )}
          </div>

          <p className="text-lg text-gray-700">{productDescription}</p>

          {sizes.length > 0 && (
            <div className="space-y-2">
              <div className="text-base font-medium text-gray-800">
                Select Size
              </div>
              <div className="flex gap-3">
                {sizes.map((sizeId) => {
                  const size = sizeOptions.find((s) => s._id === sizeId);
                  const label = size?.label || size?.name || sizeId;
                  return (
                    <button
                      key={sizeId}
                      onClick={() => setSelectedSize(sizeId)}
                      className={`w-12 h-12 border rounded-sm text-sm font-semibold ${
                        selectedSize === sizeId
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-gray-800 border-gray-300"
                      }`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="w-56">
            <Button
              onClick={handleAddToCart}
              className="w-full rounded-none cursor-pointer h-14 mt-4 text-lg font-medium bg-violet-500 text-white hover:bg-black hover:text-white"
            >
              Add To Cart
            </Button>
          </div>

          <ul className="mt-4 space-y-2 text-sm text-gray-600">
            <li>✅ 100% Original product.</li>
            <li>✅ Cash on delivery available.</li>
            <li>✅ Easy return & exchange within 7 days.</li>
          </ul>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex border-b border-gray-200">
          {["description", "reviews"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 -mb-px font-medium ${
                activeTab === tab
                  ? "border-b-2 border-indigo-600 text-indigo-600"
                  : "text-gray-600"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}{" "}
              {tab === "reviews" && `(${reviews.length})`}
            </button>
          ))}
        </div>
        <div className="mt-4 text-base text-gray-700 leading-relaxed">
          {activeTab === "description" ? (
            <p>
              Our e-commerce platform is a dynamic and user-friendly online
              marketplace designed to streamline the buying and selling of
              products across a wide range of categories...
            </p>
          ) : reviews.length ? (
            reviews.map((r, i) => (
              <div key={i} className="mb-4">
                <div className="flex items-center gap-2">
                  {[...Array(r.rating)].map((_, idx) => (
                    <Star
                      key={idx}
                      fill="currentColor"
                      className="text-yellow-500"
                      size={16}
                    />
                  ))}
                  <span className="text-sm font-medium">{r.user}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{r.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet.</p>
          )}
        </div>
      </div>

      <Separator />

      {/* Related Products */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Related Products
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mb-10">
          {related.map((item) => (
            <ProductCard key={item._id} product={item} onAddToCart={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
