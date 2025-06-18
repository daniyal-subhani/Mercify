// components/NotFoundPage.tsx

import { Button } from "@/components/ui/button";
import { RouteIndex } from "@/helpers/routesName";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-20 text-center text-sm sm:text-base">
      <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent dark:from-white dark:to-gray-600">
        404 Not Found
      </h1>

      <div className="my-6 h-px w-72 sm:w-80 bg-gradient-to-r from-gray-300 to-gray-700 rounded dark:from-gray-500 dark:to-gray-800" />

      <p className="max-w-md text-gray-500 dark:text-gray-400 sm:text-lg">
        The page you’re looking for doesn’t exist or has been moved.
      </p>

      <Link to={RouteIndex}>
        <Button className="mt-10 gap-2 cursor-pointer hover:bg-black" variant="default" size="lg">
          Back to Home
          <ArrowRight className="w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
}
