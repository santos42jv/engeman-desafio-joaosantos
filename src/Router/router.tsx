import { createBrowserRouter, RouterProvider } from "react-router";

import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Home from "../screens/Home";
import MainLayout from "../layouts/MainLayout";

const Router = () => {
  const router = createBrowserRouter([
  {
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Home />,
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
