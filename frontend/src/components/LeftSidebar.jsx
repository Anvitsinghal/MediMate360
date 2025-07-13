import React, { useState } from 'react';
import { FaFileUpload } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdAlarm } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CiLogout } from "react-icons/ci";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { GrUserAdmin } from "react-icons/gr";
import { useSelector } from 'react-redux';
import { IoMdMenu, IoMdClose } from "react-icons/io";

const LeftSidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  const sidebarItems = [
    { icon: <IoIosHome size={20} />, text: "Home" },
    { icon: <FaFileUpload size={20} />, text: "Upload Prescription" },
    { icon: <FaUserDoctor size={20} />, text: "Check Relevance" },
    { icon: <IoMdAlarm size={20} />, text: "Reminders" },
    { icon: <IoLibrary size={20} />, text: "Schemes" },
    { icon: <GrUserAdmin size={20} />, text: "Admin" },
    {
      icon: (
        <Avatar className="w-6 h-6">
          <AvatarImage src={user?.profilepicture?.url} />
          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-xs">
            {user?.name?.charAt(0)?.toUpperCase() || 'P'}
          </AvatarFallback>
        </Avatar>
      ),
      text: "Profile",
    },
    { icon: <CiLogout size={20} />, text: "Logout" },
  ];

  const sidebarHandler = (texttype) => {
    if (texttype == "Home") {
      navigate('/');
    } else if (texttype == "Logout") {
      logouthandler();
    } else if (texttype == "Schemes") {
      navigate('/schemes');
    } else if (texttype == "Upload Prescription") {
      navigate("/upload");
    } else if (texttype == "Profile") {
      navigate("/profile");
    } else if (texttype == "Admin") {
      if (user?.isAdmin == true) {
        navigate("/admin");
      } else {
        navigate("/");
        toast.message("You are not admin");
      }
    } else if (texttype == "Check Relevance") {
      navigate("/relevance");
    } else if (texttype == "Reminders") {
      navigate("/reminders");
    }
    
    setIsMobileMenuOpen(false);
  };

  const logouthandler = async () => {
    try {
      const res = await axios.get('http://localhost:8000/user/logout', {
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error("Try again later");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
        >
          {isMobileMenuOpen ? (
            <IoMdClose size={24} />
          ) : (
            <IoMdMenu size={24} />
          )}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div className={`md:hidden fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-blue-100 to-cyan-100 text-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full justify-between p-6">
          <div>
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-extrabold text-blue-700">
                🩺 Medicare360
              </h1>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-blue-200 rounded-lg transition-colors"
              >
                <IoMdClose size={20} className="text-blue-600" />
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {sidebarItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => sidebarHandler(item.text)}
                  className="flex items-center gap-3 px-4 py-4 rounded-xl transition-all hover:bg-blue-200/70 cursor-pointer group"
                >
                  <span className="text-blue-600 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-center text-blue-500 mt-4">
            Made with ❤️ by Anvit
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden md:flex fixed top-0 left-0 h-screen w-64 px-4 py-6 bg-gradient-to-b from-blue-100 to-cyan-100 text-gray-800 shadow-lg border-r border-blue-200 z-20">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-700 mb-10 text-center">
              🩺 Medicare360
            </h1>

            <div className="flex flex-col gap-2">
              {sidebarItems.map((item, index) => (
                <div
                  key={index}
                  onClick={() => sidebarHandler(item.text)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all hover:bg-blue-200/70 cursor-pointer group"
                >
                  <span className="text-blue-600 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </span>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-xs text-center text-blue-500 mt-4">
            Made with ❤️ by Anvit
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
