import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-blue-100 text-black">
      <LeftSidebar/>
      <div className="md:ml-64 p-4 md:p-6">
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
