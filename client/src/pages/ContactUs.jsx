import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MailIcon, PhoneIcon, MapPinIcon } from "lucide-react";
import { assets } from "@/assets/frontend_assets/assets";

const ContactUs = () => {
  return (
    <section className="min-h-screen bg-white px-6 py-12 md:px-12 lg:px-24">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left Section - Image */}
        <div>
          <img
            src={assets.contact_img}
            alt="Contact Us"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Right Section - Info & Form */}
        <div className="space-y-10">
          {/* Contact Info */}
          <Card className="shadow-sm">
            <CardContent className="space-y-6 pt-6">
              <h2 className="text-2xl font-semibold">Contact Us</h2>
              <div className="space-y-2 text-gray-700">
                <p className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-indigo-600" />
                  54709 Lahore, Punjab, Pakistan
                </p>
                <p className="flex items-center gap-2">
                  <PhoneIcon className="w-5 h-5 text-indigo-600" />
                  (+92) 342 6435289
                </p>
                <p className="flex items-center gap-2">
                  <MailIcon className="w-5 h-5 text-indigo-600" />
                  daniyalsubhani527@gmail.com
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Careers */}
          <Card className="shadow-sm">
            <CardContent className="space-y-4 pt-6">
              <h3 className="text-xl font-medium">Careers at Mercify</h3>
              <p className="text-gray-600">
                Learn more about our teams and job openings.
              </p>
              <Button variant="default">Explore Jobs</Button>
            </CardContent>
          </Card>

          {/* Subscription */}
          <Card className="shadow-sm">
            <CardContent className="space-y-4 pt-6">
              <h3 className="text-xl font-medium">
                Subscribe & get 20% off
              </h3>
              <p className="text-gray-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Input type="email" placeholder="Enter your email" />
                <Button className="w-full sm:w-auto">Subscribe</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
