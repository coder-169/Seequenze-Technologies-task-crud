import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-[100vh]">
      <div className="w-1/4 side absolute !z-40">
        <Sidebar />
      </div>
      <div className="layout w-3/4">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
