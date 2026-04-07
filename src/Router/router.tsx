import {
  createBrowserRouter,
  RouterProvider
} from "react-router";

import Login from "../screens/Login";
import Singup from "../screens/Singup";

const Router = () => {

  const router = createBrowserRouter([
      {
          path: "/",
          element: <Login/>,
      },
      {
        path: "/cadastro",
        element: <Singup/>
      }
  ]);

  return (
      <RouterProvider router={router} />
  )
}

export default Router