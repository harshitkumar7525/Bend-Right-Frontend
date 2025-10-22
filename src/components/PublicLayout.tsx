import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import BlurText from "./ui/BlurText";
import { Button } from "../components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeProvider";
import Background from "./Background";
const PublicLayout: React.FC = () => {
  const { userId } = useContext(UserContext);
  const { theme } = useTheme();
  const navigate = useNavigate();
  if (userId) navigate("/");

  return (
    <div
      className={`relative w-screen h-screen bg-transparent overflow-hidden`}
    >
      {/* Beams in background */}
      <Background />

      {/* Centered text container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <BlurText
          text="Bend Right"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={() => {}}
          className={`text-9xl md:text-4xl lg:text-7xl sm:text-2xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}
        />

        <BlurText
          text="An AI-powered yoga instructor"
          delay={250}
          animateBy="words"
          direction="top"
          onAnimationComplete={() => {}}
          className={`text-2xl md:text-xl lg:text-2xl sm:text-base font-semibold ${theme === "dark" ? "text-white" : "text-black"} mt-4`}
        />

        <BlurText
          text="Your personal guide to better posture and flexibility"
          delay={90}
          animateBy="words"
          direction="top"
          onAnimationComplete={() => {}}
          className={`text-2xl md:text-xl lg:text-2xl sm:text-base font-semibold ${theme === "dark" ? "text-white" : "text-black"} mt-4`}
        />
        <div className="mt-8">
          <NavLink to="/signup">
            <Button className="px-8 py-7 text-lg md:py-5 md:px-4 sm:py-3 sm:px-2 mr-2">
              Sign Up
            </Button>
          </NavLink>
          <NavLink to="/signin">
            <Button
              variant="outline"
              className="px-8 py-7 text-lg md:py-5 md:px-4 sm:py-3 sm:px-2"
            >
              Sign In
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
