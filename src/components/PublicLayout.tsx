import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import Beams from "./ui/Beams";
import BlurText from "./ui/BlurText";
import { Button } from "../components/ui/button";
import { NavLink } from "react-router-dom";
const PublicLayout: React.FC = () => {
  const { userId } = useContext(UserContext);

  if (userId) return null;

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden">
      {/* Beams in background */}
      <Beams
        beamWidth={2}
        beamHeight={15}
        beamNumber={12}
        lightColor="#ffffff"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={0}
        className="absolute inset-0 z-0"
      />

      {/* Centered text container */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 z-10">
        <BlurText
          text="Bend Right"
          delay={150}
          animateBy="words"
          direction="top"
          onAnimationComplete={() => {}}
          className="text-9xl md:text-6xl lg:text-7xl font-bold text-white"
        />

        <BlurText
          text="An AI-powered yoga instructor"
          delay={250}
          animateBy="words"
          direction="top"
          onAnimationComplete={() => {}}
          className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white mt-4"
        />

        <BlurText
          text="Your personal guide to better posture and flexibility"
          delay={90}
          animateBy="words"
          direction="top"
          onAnimationComplete={() => {}}
          className="text-xl md:text-2xl lg:text-3xl text-white mt-2"
        />
        <div className="mt-8">
          <NavLink to="/signup">
            <Button className="px-8 py-7 text-lg">Sign Up</Button>
          </NavLink>
          <NavLink to="/signin">
            <Button variant="outline" className="ml-4 px-8 py-7 text-lg">
              Sign In
            </Button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default PublicLayout;
