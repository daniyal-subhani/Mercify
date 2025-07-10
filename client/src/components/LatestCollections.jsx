import React, { useEffect } from "react";
import ProductCard from "./ProductCard";
import appUtils from "@/lib/appUtils";
import { getAllProductsThunk } from "@/store/thunks/productThunk";

const LatestCollections = () => {
     const { selector, dispatch } = appUtils();
    const { products, loading, error } = selector((state) => state.products);
     useEffect(() => {
        dispatch(getAllProductsThunk());
      }, [dispatch]);
  return (
    <div className="mt-14 px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center space-y-4">
        {/* Heading with centered line */}
        <div className="flex flex-wrap items-center justify-center gap-4 break-words">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wider break-words text-center">
            <span className="text-gray-400 px-2 break-words">Latest</span>
            Collections
          </h2>
          <div className="h-[2px] bg-violet-500 flex-1 max-w-[120px] sm:max-w-[200px]" />
        </div>

        {/* Description paragraph */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-snug sm:leading-relaxed">
          Discover newly added products, handpicked just for you, and get ready
          to be amazed by the latest trends and styles.
        </p>
      </div>
      {/* Add your latest collections here */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 sm:px-6 lg:px-8">
        {products.slice(0, 10).map((product) => (
          <div key={product._id} className="h-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollections;
