import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import LayoutRouter from "./LayoutRouter";
import Signin from "@/pages/Signin";
import PublicLayout from "./PublicLayout";
import Home from "@/pages/Home";
import Dashboard from "@/pages/Dashboard";
import Signup from "@/pages/Signup";
import { VideoChat } from "./VideoChat";
import { ProtectedRoute } from "./ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRouter />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <PublicLayout /> },
      { path: "/signup", element: <Signup /> },
      { path: "/signin", element: <Signin /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/home", element: <Home /> },
          { path: "/dashboard", element: <Dashboard /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/video/:pose",
        element: <VideoChat />,
      },
    ],
  },
]);

export default router;
