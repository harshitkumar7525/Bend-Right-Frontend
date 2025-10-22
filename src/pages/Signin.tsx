import Background from "@/components/Background";
import GlassNavbar from "@/components/GlassBar";
import { SigninCard } from "@/components/SigninCard";

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
