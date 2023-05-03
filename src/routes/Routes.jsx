import { useRoutes } from "react-router-dom";
import React, { useEffect } from "react";
import LayoutPage from "../pages/layout/LayoutPage";
import Branches from "../pages/mainPages/Branches";
import Main from "../pages/mainPages/Main";
import MainAuth from "../helper/MainAuth";
import Loginpage from "../pages/mainPages/Loginpage";
import LoginRoute from "../pages/mainPages/LoginRoute";

const routes = [
  {
    path: "login",
    element: <LoginRoute />,
    children: [
      {
        index: true,
        element: <Loginpage />,
      },
    ],
  },
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        element: <MainAuth />,
        children: [
          {
            path: "/home",
            children: [
              {
                index: true,
                element: <Main />,
              },
              {
                path: "branches",
                element: <Branches />,
              },
              {
                path: "branches/:full_name",
                element: <Branches />,
              },
            ],
          },
        ],
      },
    ],
  },
];
export default function Routes() {
  return useRoutes(routes);
}
