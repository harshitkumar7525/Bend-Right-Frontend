import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

import LayoutRouter from "./LayoutRouter";
import PublicLayout from "./PublicLayout";
import { ProtectedRoute } from "./ProtectedRoute";

const ErrorPage = lazy(() => import("../pages/ErrorPage"));
const Signin = lazy(() => import("@/pages/Signin"));
const Signup = lazy(() => import("@/pages/Signup"));
const Home = lazy(() => import("@/pages/Home"));
const Dashboard = lazy(() => import("@/pages/Dashboard"));
const VideoChat = lazy(() =>
  import("./VideoChat").then((module) => ({ default: module.VideoChat }))
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
