import { assets } from "@/assets/frontend_assets/assets";
import { Mail } from "lucide-react";

const About = () => {
  const year = new Date().getFullYear();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2">
            <img
              src={assets.about_img}
              alt="About Forever"
              className="w-full h-[400px] object-cover object-center rounded-2xl shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 space-y-6">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
              About Us
            </h1>
            <p className="text-gray-600">
              Forever was born out of a passion for innovation and a desire to revolutionize the way people shop online. We started with one simple idea: make online shopping seamless, inspiring, and reliable.
            </p>
            <div className="space-y-4 text-gray-700">
              <p>
                Our journey began with a mission to create a platform where anyone could discover a wide range of quality products—from fashion and beauty to electronics and home essentials—all from the comfort of home.
              </p>
              <p>
                Today, we're proud to offer an extensive collection curated from trusted brands and suppliers, ensuring every customer's expectations are exceeded.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto space-y-6">
          <h3 className="text-2xl sm:text-3xl font-bold">Our Mission</h3>
          <p className="text-gray-700">
            We're here to empower customers with choice, convenience, and confidence. At Forever, our goal is to make shopping a delight—from browsing to delivery, and everything in between.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl sm:text-3xl font-bold mb-12">Why Choose Forever?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Quality Assurance",
              text: "Every product is hand-picked and vetted for top-notch quality standards.",
            },
            {
              title: "Effortless Experience",
              text: "Our user-friendly design and checkout make shopping smooth and intuitive.",
            },
            {
              title: "Customer-First Support",
              text: "Our support team is always ready to help—your satisfaction comes first.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100"
            >
              <h4 className="text-xl font-semibold mb-4">{item.title}</h4>
              <p className="text-gray-600">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h3 className="text-2xl sm:text-3xl font-bold">Subscribe Now & Get 20% Off</h3>
          <p className="text-gray-600">
            Join our mailing list and be the first to hear about new arrivals, exclusive deals, and more.
          </p>
          <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-6 py-3 rounded-lg border border-gray-300 w-full sm:w-96 focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <button
              type="submit"
              className="flex items-center gap-2 px-8 py-3 rounded-lg font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-colors duration-300"
            >
              <Mail size={18} /> Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default About;