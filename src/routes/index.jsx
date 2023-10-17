import { createBrowserRouter } from "react-router-dom";
import { App } from "@/app";
import {
  Home,
  Register,
  Login,
  Error,
  Profile,
  Search,
  HomeAdmin,
  AdminPost,
  Post,
} from "@/pages";
import { PrivateRoute } from "./private-route";

import AppLayout from "@/layouts/app-layout";
import AuthLayout from "@/layouts/auth-layout";

export const router = createBrowserRouter([
  {
    element: <App />,
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
]);
