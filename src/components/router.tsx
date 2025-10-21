import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import LayoutRouter from "./LayoutRouter";
const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRouter />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <h1>Home Page</h1> },
      { path: "dashboard", element: <h1>Dashboard</h1> },
      { path: "contact", element: <h1>Contact Page</h1> },
      { path: "signup", element: <h1>Sign Up Page</h1> },
      { path: "signin", element: <h1>Sign In Page</h1> },
    ],
  },
]);

export default router;