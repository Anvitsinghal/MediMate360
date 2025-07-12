import React from 'react';
import { useState, useEffect } from 'react';

const NotFound = () => {
  const [message, setMessage] = useState("Oops! The page you're looking for doesn't exist.");

  useEffect(() => {
    document.title = "404 - Page Not Found";
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-4 font-inter">
      <div className="text-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-8 md:p-12 shadow-2xl max-w-lg w-full transform transition-all duration-500 hover:scale-105">
        <h1 className="text-8xl md:text-9xl font-extrabold text-white drop-shadow-lg animate-bounce-slow">
          404
        </h1>
        <p className="mt-4 text-2xl md:text-3xl font-semibold mb-4 text-gray-100">
          {message}
        </p>
        <p className="text-lg md:text-xl text-gray-200 mb-8">
          It looks like you've stumbled upon a broken link or a page that has been removed.
        </p>
        <a
          href="/"
          className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full shadow-lg text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m0 0l7 7M19 10v10a1 1 0 01-1 1h-3m-6 0v-9m0 0V5a2 2 0 012-2h2a2 2 0 012 2v10m-6 0h6"
            />
          </svg>
          Go to Homepage
        </a>
      </div>
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }
        .font-inter {
          font-family: 'Inter', sans-serif;
        }
      `}</style>
    </div>
  );
};

export default NotFound;