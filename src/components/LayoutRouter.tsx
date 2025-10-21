// src/routes/LayoutRouter.tsx
import React, { useContext } from "react";
import RouteLayout from "./RootLayout";
import { UserContext } from "../context/UserContextProvider";
import PublicLayout from "./PublicLayout";

const LayoutRouter: React.FC = () => {
  const { userId } = useContext(UserContext);
  return userId ? <RouteLayout /> : <PublicLayout />;
};

export default LayoutRouter;
