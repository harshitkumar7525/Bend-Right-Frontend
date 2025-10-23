import React from "react";
import { NavLink, useLocation } from "react-router-dom";

interface NavigationBarLinksProps {
  link: { name: string; href: string };
  handleSignOut?: (event: React.MouseEvent) => void;
}

const NavigationBarLinks: React.FC<NavigationBarLinksProps> = ({
  link,
  handleSignOut,
}) => {
  const location = useLocation();

  if (
    (location.pathname === "/signin" || location.pathname === "/signup") &&
    link.name === "Home"
  ) {
    link.href = "/";
  }

  return (
    <NavLink
      to={link.href}
      onClick={handleSignOut}
      className={({ isActive }) =>
        `text-gray-300 hover:text-white transition-colors duration-200 ${
          isActive ? "font-bold" : ""
        }`
      }
    >
      {link.name}
    </NavLink>
  );
};

export default NavigationBarLinks;
