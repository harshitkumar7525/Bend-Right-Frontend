import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import LayoutRouter from "./LayoutRouter";
import Signin from "@/pages/Signin";
import PublicLayout from "./PublicLayout";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Signup from "@/pages/Signup";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRouter />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <PublicLayout /> },
      { path: "/home", element: <Home /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Signin /> },
      { path: "/dashboard", element: <Dashboard /> },
    ],
  },
]);

export default router;
