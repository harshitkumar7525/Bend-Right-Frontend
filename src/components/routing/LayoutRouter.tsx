import React, { useContext } from "react";
import RootLayout from "../Layouts/RootLayout.tsx";
import { UserContext } from "../../context/UserContextProvider.tsx";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const LayoutRouter: React.FC = () => {
  const { userId } = useContext(UserContext);
  const location = useLocation();

  // Define your public routes
  const publicRoutes = ["/", "/signin", "/signup"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  if (userId) {
    // if the user is logged in
    if (isPublicRoute) {
      // and trying to access a public route
      return <Navigate to="/home" replace />; // redirect to home
    }

    // If they are on a private page, show the private app layout.
    // **IMPORTANT**: Your <RootLayout /> component MUST render an <Outlet />
    // somewhere inside it for this to work.
    return <RootLayout />;
  } else {
    // if the user is not logged in
    if (!isPublicRoute) {
      // and trying to access a private route
      return <Navigate to="/signin" replace />; // redirect to signin
    }
    // if they are on a public page, show the public layout
    return <Outlet />;
  }
};

export default LayoutRouter;
