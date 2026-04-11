import { createBrowserRouter, RouterProvider } from "react-router";

import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import Unauthorized from "../pages/Unauthorized";
import Admin from "../pages/Admin";
import { ProtectedRoute } from "../context/ProtectedRoute";

const Router = () => {
  const router = createBrowserRouter([
    {
      element: <MainLayout />,
      children: [
        {
          element: <ProtectedRoute roles={["ADMIN"]} />,
          children: [
            {
              path: "/admin",
              element: <Admin />,
            },
          ],
        },
        {
          element: <ProtectedRoute roles={["ADMIN", "CLIENTE", "CORRETOR"]} />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
          ],
        },
        {
          path: "/unauthorized",
          element: <Unauthorized />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/cadastro",
      element: <Signup />,
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
