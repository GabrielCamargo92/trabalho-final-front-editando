import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DefaultLayout from "../config/layout/Default";
import CreateLogin from "../pages/CreateLogin";
import Home from "../pages/Home";
import { Login } from "../pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout page={<Home />} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/createLogin",
    element: <CreateLogin />,
  },
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
