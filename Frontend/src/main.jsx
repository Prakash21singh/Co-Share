import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Login from "./Pages/Login/Login";
import Root from "./Root";
import Error from "./ErrorPage";
import Register from "./Pages/Register/Register";

import LoaderContextProvider from "./contexts/LoaderContextProvider";
import AuthContextProvider from "./contexts/AuthContextProvider";

//Loading related
let isLoggedIn = false;
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <LoaderContextProvider>
    <AuthContextProvider value={{ isLoggedIn }}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </AuthContextProvider>
  </LoaderContextProvider>
);
