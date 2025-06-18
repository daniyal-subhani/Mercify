import { ShieldCheck, RefreshCcw, Headset } from "lucide-react";

const features = [
  {
    icon: <RefreshCcw className="w-10 h-10 text-violet-600" />,
    title: "Easy Exchange",
    description: "Exchange any item within 7 days, no questions asked.",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-violet-600" />,
    title: "7-Day Return",
    description: "Return your order hassle-free within 7 days.",
  },
  {
    icon: <Headset className="w-10 h-10 text-violet-600" />,
    title: "24/7 Support",
    description: "Get help anytime through chat, email, or phone.",
  },
];

const WhyShopWithUs = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-14 my-14">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
        {features.map((feature, idx) => (
          <div key={idx} className="flex flex-col items-center space-y-4">
            <div className="bg-violet-100 p-4 rounded-full shadow-md">
              {feature.icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">{feature.title}</h3>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyShopWithUs;
