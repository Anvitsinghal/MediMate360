import React from 'react';
import { Link } from 'react-router-dom';
import { FaFileUpload } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { IoMdAlarm } from "react-icons/io";
import { IoLibrary } from "react-icons/io5";
import { IoIosHome } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CiLogout } from "react-icons/ci";
import { useSelector } from 'react-redux';

const features = [
  { 
    icon: <FaFileUpload size={28} />, 
    text: "Upload Prescription", 
    link: "/upload",
    description: "Upload your prescription and get instant medicine details",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  { 
    icon: <FaUserDoctor size={28} />, 
    text: "Check Relevance", 
    link: "/relevance",
    description: "Verify medicine relevance for your condition",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-50",
    iconColor: "text-green-600"
  },
  { 
    icon: <IoMdAlarm size={28} />, 
    text: "Reminders", 
    link: "/reminders",
    description: "Set medication reminders and never miss a dose",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600"
  },
  { 
    icon: <IoLibrary size={28} />, 
    text: "Schemes", 
    link: "/schemes",
    description: "Explore government health schemes and benefits",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600"
  },
];

const Home = () => {
  const { user } = useSelector(store => store.auth);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
        
        <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full mb-6 shadow-lg">
                <span className="text-3xl">🩺</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-800 bg-clip-text text-transparent mb-6">
                Welcome to MediMate360
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Your comprehensive healthcare companion. Upload prescriptions, get detailed medicine information, 
                set smart reminders, and discover government health schemes tailored just for you.
              </p>
              {user && (
                <div className="mt-6 flex items-center justify-center gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.profilepicture?.url} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                      {user.name?.charAt(0)?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-gray-600 font-medium">Welcome back, {user.name}!</span>
                </div>
              )}
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
              {features.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="group relative"
                >
                  <div className={`h-full p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 ${item.bgColor} hover:bg-white`}>
                    <div className="text-center">
                      <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <div className="text-white">
                          {item.icon}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                        {item.text}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                      <div className="mt-6 flex items-center justify-center">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${item.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-20 text-center">
              <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto border border-gray-100">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
                  Why Choose MediMate360?
                </h2>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl">⚡</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Fast & Accurate</h3>
                    <p className="text-sm text-gray-600">Instant prescription analysis with high accuracy</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl">🛡️</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Secure & Private</h3>
                    <p className="text-sm text-gray-600">Your health data is protected and confidential</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl">🎯</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 mb-2">Personalized</h3>
                    <p className="text-sm text-gray-600">Tailored recommendations for your needs</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 text-center">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-8 text-white">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                  Ready to Get Started?
                </h2>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Join thousands of users who trust MediMate360 for their healthcare needs. 
                  Start your journey towards better health management today.
                </p>
                <Link
                  to="/upload"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 duration-200"
                >
                  <FaFileUpload size={20} />
                  Upload Your First Prescription
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
