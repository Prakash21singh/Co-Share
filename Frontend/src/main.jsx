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
import Index from "./Pages/Index/Index";

//Loading related
const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute element={Root}></ProtectedRoute>,
    errorElement: <Error />,

    children: [
      { index: true, element: <Index /> },
      {
        path: "uploads",
        element: <h1>This is all uploads section</h1>,
      },
      {
        path: "upload",
        element: <h1>This is upload section</h1>,
      },
      {
        path: "users",
        element: <h1>This is All Users</h1>,
      },
      {
        path: "profile",
        element: <h1>This is my profile</h1>,
      },
      {
        path: "my-upload",
        element: <h1>This is my upload section</h1>,
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
