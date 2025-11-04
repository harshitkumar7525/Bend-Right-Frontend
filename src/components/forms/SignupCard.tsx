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
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContextProvider";

interface SignupFormData {
  userName: string;
  email: string;
  password: string;
  signupError?: string;
}

export function SignupCard() {
  const navigate = useNavigate();
  const { userId, setUserId, setUserName } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>();

  const [userName, email, password] = watch(["userName", "email", "password"]);

  useEffect(() => {
    if (userId) {
      navigate("/home");
    }
    clearErrors("signupError");
  }, [userId, navigate, clearErrors]);

  useEffect(() => {
    clearErrors("signupError");
  }, [userName, email, password, clearErrors]);

  const onSubmit = (data: SignupFormData) => {
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`, data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        setUserId(response.data._id);
        setUserName(response.data.userName);
      })
      .catch((error) => {
        console.error("Sign Up Error:", error);

        const message =
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Something went wrong. Please try again.";

        setError("signupError", { message });
      });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create a new account</CardTitle>
        <CardDescription>
          Enter your email below to create a new account
        </CardDescription>
        <CardAction>
          <NavLink to="/signin">
            <Button variant="link">Sign In</Button>
          </NavLink>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="your username"
                required
                {...register("userName", {
                  required: "Username is required",
                  minLength: {
                    value: 3,
                    message: "Username must be at least 3 characters",
                  },
                })}
              />
              {errors.userName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.userName.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    message: "Enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
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
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength: {
                    value: 20,
                    message: "Password must be at most 20 characters",
                  },
                })}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            {errors.signupError && (
              <p className="text-red-500 text-sm mt-2">
                {errors.signupError.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full mt-5">
            Sign Up
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2"></CardFooter>
    </Card>
  );
}
