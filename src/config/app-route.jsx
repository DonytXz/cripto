import React from "react";
import App from "./../app.jsx";
import { Navigate } from "react-router";

import PagesError from "./../pages/pages/error.jsx";
import PagesLogin from "./../pages/pages/login.jsx";
import Home from "./../pages/home/home.jsx";

const AppRoute = [
  {
    path: "*",
    element: <App />,
    children: [
      { path: "", element: <Navigate to="/home" /> },
      { path: "home", element: <Home /> },
      {
        path: "pages/*",
        children: [
          { path: "error", element: <PagesError /> },
          { path: "login", element: <PagesLogin /> },
          // { path: "register", element: <PagesRegister /> },
        ],
      },
    ],
  },
];

export default AppRoute;
