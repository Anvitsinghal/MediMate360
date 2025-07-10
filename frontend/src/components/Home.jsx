import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileUpload } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdAlarm } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CiLogout } from "react-icons/ci";
const features = [
  { icon: <IoIosHome size={24} />, text: "Home", link: "/" },
  { icon: <FaFileUpload size={24} />, text: "Upload Prescription", link: "/upload" },
  { icon: <FaUserDoctor size={24} />, text: "Check Relevance", link: "/relevance" },
  { icon: <IoMdAlarm size={24} />, text: "Reminders", link: "/reminders" },
  { icon: <IoLibrary size={24} />, text: "Schemes", link: "/schemes" },
];

const Home = () => {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-blue-600">Welcome to MediMate360</h1>
        <p className="mt-4 text-gray-700 max-w-2xl mx-auto">
          Your all-in-one healthcare companion. Upload prescriptions, get detailed medicine info,
          set reminders, and explore government health schemes personalized for you.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-5xl mx-auto">
        {features.map((item, index) => (
          <Link
            key={index}
            to={item.link}
            className="flex flex-col items-center justify-center p-6 bg-white shadow-md rounded-lg hover:bg-blue-100 transition-all duration-200 text-center"
          >
            <div className="mb-2 text-blue-600">{item.icon}</div>
            <div className="text-lg font-medium text-gray-800">{item.text}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
