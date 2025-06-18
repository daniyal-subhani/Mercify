// components/Footer.jsx

import {
  Mail,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

export default function Footer() {
  return (
    <footer className="w-full px-6 pt-12 pb-6 md:px-16 lg:px-36 text-muted-foreground border-t ">
      <div className="flex flex-col md:flex-row justify-between gap-12 border-b pb-10 ">
        {/* Logo and Description */}
        <div className="md:max-w-md">
          <span className="text-3xl font-bold text-foreground">Mercify</span>
          <p className="mt-6 text-base leading-relaxed">
            At Mercify, we’re redefining online shopping with handpicked
            collections, secure checkout, and lightning-fast delivery.
          </p>
          <div className="flex gap-3 mt-6">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/googlePlayBtnBlack.svg"
              alt="Google Play"
              className="h-12 w-auto border border-white rounded"
            />
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/refs/heads/main/assets/appDownload/appleStoreBtnBlack.svg"
              alt="App Store"
              className="h-12 w-auto border border-white rounded"
            />
          </div>
        </div>
        <div>
          <Separator orientation="vertical" />
        </div>

        {/* Navigation and Contact */}
        <div className="flex-1 flex flex-col sm:flex-row justify-between gap-10">
          <div>
            <h2 className="font-semibold mb-4 text-foreground text-lg">
              Company
            </h2>
            <ul className="space-y-3 text-base">
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:underline">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <Separator orientation="vertical" />
          </div>
          <div>
            <h2 className="font-semibold mb-4 text-foreground text-lg">
              Get in Touch
            </h2>
            <ul className="space-y-3 text-base">
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span>+1-234-567-890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                <a
                  href="mailto:daniyalsubhani527@gmail.com"
                  className="hover:underline"
                >
                  daniyalsubhani527@gmail.com
                </a>
              </li>
            </ul>

            <div className="flex gap-5 mt-5 text-foreground">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5 hover:text-blue-600 transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5 hover:text-sky-500 transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 hover:text-pink-500 transition-colors" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 hover:text-blue-700 transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <p className="text-center text-sm mt-8 text-muted-foreground bg-white">
        &copy; {new Date().getFullYear()} Daniyal Subhani. All Rights Reserved.
      </p>
    </footer>
  );
}
