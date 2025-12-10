import React, { useState, useContext } from "react";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, X } from "lucide-react";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../contexts/AuthContext";

const Layout = () => {
  const navigate = useNavigate();
  const [sidebar, setSidebar] = useState(false);

  const { user } = useContext(AuthContext); // Firebase user

  // If user not logged in → redirect to /signin
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="flex flex-col items-start justify-start h-screen">
      {/* Top Navbar */}
      <nav className="w-full px-8 min-h-14 flex items-center justify-between border-b border-gray-200">
        <img
          className="cursor-pointer w-32 sm:w-44"
          src={assets.logo}
          alt="logo"
          onClick={() => navigate("/")}
        />

        {sidebar ? (
          <X
            onClick={() => setSidebar(false)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        ) : (
          <Menu
            onClick={() => setSidebar(true)}
            className="w-6 h-6 text-gray-600 sm:hidden"
          />
        )}
      </nav>

      {/* Main Layout */}
      <div className="flex-1 w-full flex h-[calc(100vh-64px)]">
        <Sidebar sidebar={sidebar} setSidebar={setSidebar} />

        <div className="flex-1 bg-[#F4F7FB] overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;