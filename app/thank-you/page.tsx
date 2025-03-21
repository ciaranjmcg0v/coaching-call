"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ThankYouPage = () => {
  const router = useRouter();

  const handleGoHome = () => {
    // Redirect to the home page or previous page (adjust URL as necessary)
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-300 to-purple-300 text-white text-center px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Thank You for Watching!
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          I hope you enjoyed the presentation. This is all important knowledge
          for developing websites, saas products and many other online based
          services. I hope this can be beneficial for you all.
        </p>
        <div className="flex justify-center gap-6">
          <button
            className="px-8 py-3 bg-indigo-700 hover:bg-indigo-800 text-white text-lg rounded-lg transition duration-300 cursor-pointer"
            onClick={handleGoHome}
          >
            Go to Home
          </button>
        </div>
      </div>
      <div className="absolute bottom-4 text-sm text-gray-200">
        <p>Created with ❤️ by Ciaran</p>
      </div>
    </div>
  );
};

export default ThankYouPage;
