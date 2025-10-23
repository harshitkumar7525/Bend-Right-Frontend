import { useEffect } from "react";
import Masonry from "@/components/ui/Masonry.tsx";
import { homeImagesData } from "@/utils/imageData";
import BlurText from "@/components/ui/BlurText";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <>
      <div>
        <Masonry
          items={homeImagesData}
          ease="power3.out"
          duration={0.6}
          stagger={0.05}
          animateFrom="bottom"
          scaleOnHover={true}
          hoverScale={0.95}
          blurToFocus={true}
          colorShiftOnHover={false}
        />

        <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black/50">
          <BlurText
            text="Find your stillness"
            delay={50}
            animateBy="words"
            direction="top"
            onAnimationComplete={() => {}}
            className={`text-7xl md:text-3xl lg:text-5xl sm:text-xl font-bold text-white`}
          />
          <BlurText
            text="Begin the journey within"
            delay={50}
            animateBy="words"
            direction="top"
            onAnimationComplete={() => {}}
            className={`text-3xl md:text-xl lg:text-2xl sm:text-base text-white mt-1.5`}
          />
          <NavLink to="/dashboard">
            <Button className="mt-6">Let's Begin</Button>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Home;
