"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { House } from "lucide-react";

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
        <p className="text-xl md:text-2xl mb-8">
          The repo for this presentation is available for free on <a className="text-black font-semibold underline" href="https://github.com/ciaranjmcg0v/coaching-call" target="_blank">Github</a>. I will
          also be adding more content to it in the future, with coding examples,
          short tutorials and additional resources.
        </p>
        <div className="flex justify-center gap-6">
          <button
            className="flex items-center pl-1 pr-4 py-1 bg-indigo-400 hover:bg-indigo-600 text-white text-lg rounded-full transition duration-300 cursor-pointer"
            onClick={handleGoHome}
          >
            <div className="flex items-center justify-center bg-indigo-900 rounded-full p-1">
              <House size={24} className="text-indigo-300" />
            </div>
            <span className="ml-2 text-sm">Home</span>
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
