import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import LayoutRouter from "./LayoutRouter.tsx";
import PublicLayout from "../Layouts/PublicLayout.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";

const ErrorPage = lazy(() => import("../../pages/ErrorPage.tsx"));
const Signin = lazy(() => import("@/pages/Signin.tsx"));
const Signup = lazy(() => import("@/pages/Signup.tsx"));
const Home = lazy(() => import("@/pages/Home.tsx"));
const Dashboard = lazy(() => import("@/pages/Dashboard.tsx"));
const VideoChat = lazy(() =>
  import("../VideoChat.tsx").then((module) => ({ default: module.VideoChat }))
);

const LazyLoadingFallback = () => (
  <div style={{ padding: "20px", textAlign: "center" }}>Loading...</div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutRouter />,
    errorElement: (
      <Suspense fallback={<LazyLoadingFallback />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <PublicLayout />,
      },
      {
        path: "/signup",
        element: (
          <Suspense fallback={<LazyLoadingFallback />}>
            <Signup />
          </Suspense>
        ),
      },
      {
        path: "/signin",
        element: (
          <Suspense fallback={<LazyLoadingFallback />}>
            <Signin />
          </Suspense>
        ),
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/home",
            element: (
              <Suspense fallback={<LazyLoadingFallback />}>
                <Home />
              </Suspense>
            ),
          },
          {
            path: "/dashboard",
            element: (
              <Suspense fallback={<LazyLoadingFallback />}>
                <Dashboard />
              </Suspense>
            ),
          },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: (
      <Suspense fallback={<LazyLoadingFallback />}>
        <ErrorPage />
      </Suspense>
    ),
    children: [
      {
        path: "/video/:pose",
        element: (
          <Suspense fallback={<LazyLoadingFallback />}>
            <VideoChat />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
