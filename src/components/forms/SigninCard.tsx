import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "@/context/UserContextProvider";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface SigninFormData {
  email: string;
  password: string;
  loginError?: string;
}

export function SigninCard() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<SigninFormData>();

  const email = watch("email");
  const password = watch("password");
  const { userId, setUserId,setUserName } = useContext(UserContext);

  useEffect(() => {
    if (userId) {
      navigate("/home");
    }
    clearErrors("loginError");
  }, [userId, navigate, clearErrors, email, password]);

  const onSubmit = (data: SigninFormData) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/login`, data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setUserId(response.data._id);
        setUserName(response.data.name);
      })
      .catch((error) => {
        console.error("Sign In Error:", error);

        const message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Invalid username or password";

        setError("loginError", { message });
      });
  };
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <NavLink to="/signup">
            <Button variant="link">Sign Up</Button>
          </NavLink>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your email"
                required
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message as string}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                required
                {...register("password", {
                  required: "Password is required",
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message as string}
                </p>
              )}
            </div>
            {errors.loginError && (
              <p className="text-red-500 text-sm mt-2">
                {errors.loginError.message as string}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full mt-5">
            Login
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
