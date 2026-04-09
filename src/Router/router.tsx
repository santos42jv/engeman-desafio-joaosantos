import {
  createBrowserRouter,
  RouterProvider
} from "react-router";

import Login from "../screens/Login";
import Signup from "../screens/Signup";

const Router = () => {

  const router = createBrowserRouter([
      {
          path: "/login",
          element: <Login/>,
      },
      {
        path: "/cadastro",
        element: <Signup/>
      }
  ]);

  return (
      <RouterProvider router={router} />
  )
}

export default Router