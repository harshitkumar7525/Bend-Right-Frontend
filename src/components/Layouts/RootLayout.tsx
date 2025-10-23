import React from "react";
import { Outlet } from "react-router-dom";
import GlassNavbar from "../Navbar/GlassBar.tsx";
const RootLayout: React.FC = () => {
  const location = window.location.pathname;
  return (
    <>
      <nav className={`${location === "/home" ? "fixed top-0 left-0 right-0 z-20" : ""}`}>
        <GlassNavbar />
      </nav>
      <Outlet />
    </>
  );
};

export default RootLayout;
