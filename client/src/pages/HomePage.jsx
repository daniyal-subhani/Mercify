import BestSellers from "@/components/BestSellers";
import LatestCollections from "@/components/LatestCollections";
import MainBanner from "@/components/MainBanner";
import NewsletterSection from "@/components/NewsLetter";
import { Separator } from "@/components/ui/separator";
import WhyShopWithUs from "@/components/WhyShopWithUs";
import React from "react";

const HomePage = () => {
  return (
    <main className="relative min-h-screen">
      {/* Violet dotted background (transparent base) */}
      <div className="absolute inset-0 -z-10 h-full w-full [background-image:radial-gradient(theme(colors.violet.300)_1px,transparent_1px)] [background-size:16px_16px]" />

      {/* Main content */}
      <MainBanner />
      <h2 className="mx-auto text-center">WEBSITE UNDER MAINTENANCE...!</h2>
      <Separator />
      <section>
        <LatestCollections />
        <BestSellers />
        <WhyShopWithUs />
        <NewsletterSection />
      </section>
    </main>
  );
};

export default HomePage;
