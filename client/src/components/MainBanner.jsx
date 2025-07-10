import React from "react";
import { Card, CardContent } from "./ui/card";
import { assets } from "@/assets/frontend_assets/assets";
import { Button } from "./ui/button";
import { TypewriterText } from "@/components/TypeWritter";
import { RouteCollection } from "@/helpers/routesName";
import { useNavigate } from "react-router-dom";

const MainBanner = () => {
  const navigate = useNavigate()
  const year = new Date().getFullYear();
  const headlines = [
    "Unleash Your Signature Look",
    "Discover the New Collection",
    "Shop the Summer Sale",
    "Elevate Your Style Today",
  ];
  return (
    <section className="p-0 m-0">
      <Card className="relative overflow-hidden p-0 m-0 border-none shadow-none rounded-none">
        {/* Responsive Banner Images */}
        {/* Desktop */}

        <img
          src={assets.banner_lg}
          alt=" Banner - Desktop"
          className="hidden lg:block md:hidden sm:hidden w-full h-[93vh] object-cover"
        />
        {/* Tablet */}

        <img
          src={assets.banner_md}
          alt=" Banner - Tablet"
          className="hidden md:block lg:hidden sm:hidden w-full h-[95vh] object-cover"
        />
        {/* Mobile */}

        <img
          src={assets.banner_sm}
          alt=" Banner - Mobile"
          className="block md:hidden lg:hidden sm:block  w-full h-[95vh] object-cover"
        />

        {/* Text Overlay — aligned bottom */}
        <CardContent
          className="absolute inset-0 flex flex-col justify-end   items-center text-white bg-gradient-to-t from-transparent via-black/40 to-transparent text-center  pb-36 md:pb-24 lg:pb-22 
             "
        >
          <span className="text-[12px] sm:text-sm md:text-base font-medium tracking-widest uppercase mb-2 text-white/90">
            Exclusive Drop
          </span>
          <h1
            style={{ fontFamily: '"Playfair Display", serif' }}
            className="  text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-3 drop-shadow-xl"
          >
            <TypewriterText
              texts={headlines}
              typeSpeed={100}
              deleteSpeed={50}
              delaySpeed={1500}
              className="inline-block text-transparent bg-clip-text bg-white"
            />
          </h1>
          <p className="text-sm sm:text-base md:text-lg font-light max-w-2xl text-white/90 mb-5">
            Redefine your style this season with trendsetting fits and timeless
            classics.
          </p>

          <div className="space-y-3 sm:space-y-4 mb-6">
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide text-white">
              Summer Collection <span> {year} </span>
            </p>
            <p className="text-sm sm:text-base md:text-lg font-medium bg-white/20 text-white backdrop-blur-lg px-6 py-2 rounded-full inline-block shadow-md">
              🔥 Save up to <span className="font-bold">70%</span> on premium
              fashion
            </p>
          </div>
          <div
            style={{ fontFamily: '"Playfair Display", serif' }}
            className="mt-4 "
          >
            <Button onClick={()=> navigate(RouteCollection)} className="bg-white cursor-pointer text-black hover:bg-violet-600 hover:text-white transition-colors duration-300 py-3  px-10  text-xl md:text-2xl lg:text-3xl md:h-14 h-12 lg:h-16  tracking-wide rounded-full shadow-lg">
              Explore Deals !
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default MainBanner;
