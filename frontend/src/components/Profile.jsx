import { logoutSuccess } from '@/Redux/authSlice';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
const dispatch =useDispatch();
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="ml-3 text-gray-600">Loading profile...</span>
      </div>
    );
  }
const deleteprofilehandler=async ()=>{
  try {
     const res=await axios.delete("https://medimate360.onrender.com/user/delete",{
      withCredentials:true
     })
     if(res.data.success){
      toast.success("User Account deleted");
      navigate("/login");
        dispatch(logoutSuccess(null));
     }
  } catch (error) {
    console.log(error);
    toast.message("Try again later");
    
  }
}
  const editprofilehandler = () => {
    navigate('/edit');
  };

  const getProfileStats = () => [
    {
      // Bell/Notification Icon
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.003 2.003 0 0118 14.59V13a3 3 0 00-3-3H9a3 3 0 00-3 3v1.59c0 .537.213 1.052.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      label: "Active Reminders",
      value: user.reminders?.length || 0,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      // Book/Library Icon
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.523 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
        </svg>
      ),
      label: "Matched Schemes",
      value: user.matchedSchemes?.length || 0,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      // Medical Cross Icon
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: "Diseases",
      value: user.diseases?.length || 0,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header Section */}
          <div className="relative bg-gradient-to-r from-blue-600 to-cyan-600 p-8 text-white">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="relative">
                  {user.profilepicture?.url ? (
                    <img
                      src={user.profilepicture.url}
                      alt="Profile"
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white shadow-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                      <span className="text-3xl sm:text-4xl font-bold">
                        {user.name?.charAt(0)?.toUpperCase() || 'U'}
                      </span>
                    </div>
                  )}
                  {user.isAdmin && (
                    <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      ADMIN
                    </div>
                  )}
                </div>
                <div className="text-center sm:text-left">
                  <h1 className="text-2xl sm:text-3xl font-bold mb-2">{user.name}</h1>
                  <p className="text-blue-100 text-lg">{user.email}</p>
                  <div className="flex items-center justify-center sm:justify-start gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1">
                      {/* Person Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      {user.gender || "Not specified"}
                    </span>
                    <span className="flex items-center gap-1">
                      {/* Calendar Icon */}
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {user.age ? `${user.age} years` : "Age not specified"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {getProfileStats().map((stat, index) => (
                <div key={index} className={`${stat.bgColor} rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl mb-3 text-white`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                {/* Settings Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Profile Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProfileItem
                  // Person Icon
                  icon={(
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  label="Full Name"
                  value={user.name}
                  color="text-blue-600"
                />
                <ProfileItem
                  // Mail Icon
                  icon={(
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 6h.01M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  label="Email Address"
                  value={user.email}
                  color="text-green-600"
                />
                <ProfileItem
                  // Person Icon
                  icon={(
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                  label="Gender"
                  value={user.gender || "Not specified"}
                  color="text-purple-600"
                />
                <ProfileItem
                  // Calendar Icon
                  icon={(
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                  label="Age"
                  value={user.age ? `${user.age} years` : "Not specified"}
                  color="text-orange-600"
                />
                <ProfileItem
                  // Location Icon
                  icon={(
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0l-4.243-4.243m10.606-10.607a4 4 0 11-5.656 0 4 4 0 015.656 0z" />
                    </svg>
                  )}
                  label="State"
                  value={user.state || "Not specified"}
                  color="text-red-600"
                />
                <ProfileItem
                  // Medical Cross Icon
                  icon={(
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  label="Diseases"
                  value={user.diseases?.length > 0 ? user.diseases.join(", ") : "None recorded"}
                  color="text-indigo-600"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={editprofilehandler}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {/* Pencil/Edit Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Edit Profile
              </button>
              <button
                onClick={deleteprofilehandler}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                {/* Pencil/Edit Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                Delete User
              </button>
              <button
                onClick={() => navigate('/reminders')}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-200"
              >
                {/* Bell/Notification Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.003 2.003 0 0118 14.59V13a3 3 0 00-3-3H9a3 3 0 00-3 3v1.59c0 .537.213 1.052.595 1.405L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                Manage Reminders
              </button>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        {user.diseases?.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              {/* Medical Cross Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Medical Conditions
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.diseases.map((disease, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-red-50 text-red-700 rounded-full text-sm font-medium border border-red-200"
                >
                  {disease}
                </span>
              ))}
            </div>
          </div>
        )}

        {user.matchedSchemes?.length > 0 && (
          <div className="mt-6 bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              {/* Book/Library Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.523 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.523 18.246 18 16.5 18s-3.332.477-4.5 1.253" />
              </svg>
              Eligible Schemes
            </h3>
            <p className="text-gray-600 mb-3">
              You are eligible for {user.matchedSchemes.length} government health scheme{user.matchedSchemes.length !== 1 ? 's' : ''}.
            </p>
            <button
              onClick={() => navigate('/schemes')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              View Schemes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const ProfileItem = ({ icon, label, value, color }) => (
  <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
    <div className="flex items-center gap-3 mb-2">
      <div className={`${color}`}>
        {icon}
      </div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
    </div>
    <p className="font-semibold text-gray-800 ml-8">{value}</p>
  </div>
);

export default Profile;