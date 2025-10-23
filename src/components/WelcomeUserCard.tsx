import { useContext } from "react";
import { UserContext } from "@/context/UserContextProvider";
import BlurText from "./ui/BlurText";
import { useTheme } from "./ThemeProvider";
const WelcomeUserCard = () => {
  const { userName } = useContext(UserContext);
  const { theme } = useTheme();

  return (
    <>
      <div className="bg-black/5 dark:bg-white/5 backdrop-blur-sm rounded-xl p-6 h-83">
        <BlurText
          text={`Welcome back, ${userName || "User"}!`}
          delay={50}
          animateBy="words"
          direction="top"
          onAnimationComplete={() => {}}
          className={`text-7xl md:text-3xl lg:text-5xl sm:text-xl font-bold ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        />
        <br />
        <br />
        <BlurText
          text="“Yoga is the journey of the self, through the self, to the self.”"
          delay={0}
          animateBy="words"
          direction="top"
          onAnimationComplete={() => {}}
          className={`block text-2xl mt-2 md:text-xl lg:text-2xl sm:text-base font-italic text-gray-700 dark:text-gray-400`}
        />
        <BlurText
          text="—Bhagavad Gita"
          delay={0}
          animateBy="words"
          direction="top"
          onAnimationComplete={() => {}}
          className={`block text-base mt-2 md:text-base lg:text-xl sm:text-sm font-italic text-gray-700 dark:text-gray-400`}
        />
      </div>
    </>
  );
};

export default WelcomeUserCard;
