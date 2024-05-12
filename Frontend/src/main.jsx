import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Root from "./Root";
import Error from "./ErrorPage";
import Register from "./Pages/Register/Register";
import LoaderContextProvider from "./contexts/LoaderContextProvider";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import AuthContextProvider from "./contexts/AuthContextProvider";
import Authenticated from "./components/Autenticated/Authenticated";

//Loading related
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={Root}></ProtectedRoute>,
    errorElement: <Error />,
    children: [
      {
        path: "profile",
        element: <h1>This is profile</h1>,
      },
    ],
  },
  {
    path: "/login",
    element: <Authenticated element={Login}></Authenticated>,
  },
  {
    path: "/register",
    element: <Authenticated element={Register}></Authenticated>,
  },
  {
    path: "setting",
    element: <h1>This is setting</h1>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <LoaderContextProvider>
      <RouterProvider router={router} />
    </LoaderContextProvider>
  </AuthContextProvider>
);
