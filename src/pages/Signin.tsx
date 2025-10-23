import Background from "@/components/backgrounds/Background.tsx";
import GlassNavbar from "@/components/Navbar/GlassBar.tsx";
import { SigninCard } from "@/components/forms/SigninCard.tsx";

const Signin = () => {
  return (
    <>
    <Background />
    <div className="min-h-screen flex flex-col">
      <GlassNavbar />
      <div className="flex flex-1 items-center justify-center">
        <SigninCard />
      </div>
    </div>
    </>
  );
};

export default Signin;
