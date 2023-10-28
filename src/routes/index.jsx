import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { App } from "@/app";
import { PrivateRoute } from "./private-route";
import { Loading } from "@/components/ui/loading";

import AppLayout from "@/layouts/app-layout";
import AuthLayout from "@/layouts/auth-layout";
import Error from "@/pages/error";
import NotFound from "@/pages/404";
import Home from "@/pages/home";

const Register = lazy(() => import("@/pages/auth/register"));
const Login = lazy(() => import("@/pages/auth/login"));
const AdminPost = lazy(() => import("@/pages/admin/post"));
const Profile = lazy(() => import("@/pages/profile"));
const Search = lazy(() => import("@/pages/search"));
const HomeAdmin = lazy(() => import("@/pages/admin"));
const Post = lazy(() => import("@/pages/post"));
const PeopleGoneRequest = lazy(() =>
  import("@/pages/admin/people-gone-request"),
);

export const router = createBrowserRouter([
  {
    element: (
      <Suspense fallback={<Loading />}>
        <App />
      </Suspense>
    ),
    errorElement: <Error />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "search",
            element: <Search />,
          },
          {
            path: "post/:id",
            element: <Post />,
          },
          {
            path: "profile",
            element: (
              <PrivateRoute role={["user", "admin"]} redirect="/">
                <Profile />
              </PrivateRoute>
            ),
          },
          {
            path: "/r/admin",
            element: <PrivateRoute role={["admin"]} redirect="/" />,
            children: [
              {
                path: "dashboard",
                element: <HomeAdmin />,
              },
              {
                path: "create-post",
                element: <AdminPost />,
              },
              {
                path: "post/:id/edit",
                element: <AdminPost onEdit />,
              },
              {
                path: "people-gone/req/:id",
                element: <PeopleGoneRequest />,
              },
            ],
          },
        ],
      },
      {
        element: <AuthLayout />,
        path: "auth",
        children: [
          {
            element: <Register />,
            path: "register",
          },
          {
            element: <Login />,
            path: "login",
          },
        ],
      },
    ],
  },
  { element: <NotFound />, path: "*" },
]);
