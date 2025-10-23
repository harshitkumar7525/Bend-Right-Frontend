import Background from "@/components/backgrounds/Background.tsx";
import GlassNavbar from "@/components/Navbar/GlassBar.tsx";
import { SignupCard } from "@/components/forms/SignupCard.tsx";

const Signup = () => {
  return (
    <>
    <Background />
    <div className="min-h-screen flex flex-col">
      <GlassNavbar />
      <div className="flex flex-1 items-center justify-center">
        <SignupCard />
      </div>
    </div>
    </>
  );
};

export default Signup;
