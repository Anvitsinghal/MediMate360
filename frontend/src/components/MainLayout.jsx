import React from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from './LeftSidebar';

const MainLayout = () => {
  return (
    <div className="flex min-h-screen bg-blue-50 text-black">
      {/* Sidebar (hidden on small, visible on md+) */}
      <LeftSidebar />

      {/* Main content */}
      <div className="flex-1 md:ml-64 px-6 py-8 w-full">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md border border-blue-200">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
