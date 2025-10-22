import Background from "@/components/Background";
import GlassNavbar from "@/components/GlassBar";
import { SignupCard } from "@/components/SignupCard";

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
