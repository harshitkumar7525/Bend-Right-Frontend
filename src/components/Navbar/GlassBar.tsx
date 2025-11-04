import LogoIcon from "../../assets/icon.png";
import navigationBase from "@/utils/navigationBase.ts";
import NavigationBarLink from "./NavigationBarLink.tsx";
import type { NavItem } from "@/types/NavItem.ts";
import { useContext } from "react";
import { UserContext } from "@/context/UserContextProvider.tsx";
import { NavLink, useNavigate } from "react-router-dom";
import { ThemeToggle } from "../themes/ThemeToggle.tsx";

export const GlassNavbar = () => {
  const { userId, setUserId, setUserName } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignOut = (event: React.MouseEvent) => {
    event.preventDefault();
    setUserId(null);
    setUserName(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  const checkRenderable = (item: NavItem): boolean => {
    if (item.name === "Dashboard" || item.name === "Sign Out") {
      return Boolean(userId);
    } else if (item.name === "Sign In" || item.name === "Sign Up") {
      return !userId;
    }
    return true;
  };

  return (
    <div className="w-full p-4">
      <nav className="flex items-center justify-between w-full max-w-3xl mx-auto rounded-full bg-black/40 backdrop-blur-lg px-6 py-3 border border-white/10">
        {/* Left Side: Logo and Title */}
        <NavLink to="/" className="flex items-center gap-3">
          <img src={LogoIcon} alt="Logo" className="h-7 w-7" />
          <span className="text-white text-lg font-medium">Bend Right</span>
        </NavLink>

        {/* Right Side: Navigation Links */}
        <div className="flex items-center gap-6">
          <ThemeToggle />
          {navigationBase.map((link) => {
            if (!checkRenderable(link)) return null;
            return (
              <NavigationBarLink
                key={link.name}
                link={{ name: link.name, href: link.href }}
                handleSignOut={
                  link.name === "Sign Out" ? handleSignOut : undefined
                }
              />
            );
          })}
        </div>
      </nav>
    </div>
  );
};

export default GlassNavbar;
