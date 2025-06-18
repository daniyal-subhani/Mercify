import React from "react";
import ProductCard from "./ProductCard";
import { products } from "@/assets/frontend_assets/assets";

const BestSellers = () => {
  return (
   <div className="mt-14 px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center space-y-4">
        {/* Heading with centered line */}
        <div className="flex flex-wrap items-center justify-center gap-4 break-words">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-wider break-words text-center">
            <span className="text-gray-400 px-2 break-words">Best</span>
            Sellers
          </h2>
          <div className="h-[2px] bg-violet-500 flex-1 max-w-[120px] sm:max-w-[200px]" />
        </div>

        {/* Description paragraph */}
        <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-snug sm:leading-relaxed">
            Explore our top-selling products, loved by hundreds of customers for their quality, style, and unbeatable value. Don't miss out on what everyone is talking about.
        </p>
      </div>
      {/* Add your best collections here */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 sm:px-6 lg:px-8">
        {products.slice(0, 5).map((product) => (
          <div key={product._id} className="h-full">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BestSellers
