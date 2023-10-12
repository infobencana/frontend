import { createBrowserRouter } from "react-router-dom";
import { App } from "@/app";
import { Home, Register, Login, Error, Profile } from "@/pages";
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
            path: "/profile",
            element: (
              <PrivateRoute role={["user", "admin"]} redirect="/">
                <Profile />
              </PrivateRoute>
            ),
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
