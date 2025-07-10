import React from 'react';
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



const LeftSidebar = () => {
  const sidebarItems = [
  { icon: <IoIosHome size={20} />, text: "Home" },
  { icon: <FaFileUpload size={20} />, text: "Upload Prescription" },
  { icon: <FaUserDoctor size={20} />, text: "Check Relevance" },
  { icon: <IoMdAlarm size={20} />, text: "Reminders" },
  { icon: <IoLibrary size={20} />, text: "Schemes" },
  {
    icon: (
      <Avatar className="w-6 h-6">
        <AvatarImage src="" />
        <AvatarFallback>P</AvatarFallback>
      </Avatar>
    ),
    text: "Profile",
  },
  { icon: <CiLogout size={20} />, text: "Logout" },
];

  const navigate=useNavigate();
  const sidebarHandler=(texttype)=>{
  if(texttype=="Home"){
     navigate('/');
  }
  else if(texttype=="Logout"){
    logouthandler();
  }
  else if(texttype=="Schemes"){
    navigate('/schemes');
  }
}
const logouthandler=async ()=>{
  try {
    const res=await axios.get('http://localhost:8000/user/logout',{
      withCredentials:true
    })
    if(res.data.success){
      toast.success(res.data.message);
      navigate('/login');
    }
  } catch (error) {
    console.log(error);
    toast.error("Try again later");
    
  }
}
  return (
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
                onClick={()=>sidebarHandler(item.text)}
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
  );
};

export default LeftSidebar;
