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
import GlobalUpload from "./Pages/GlobalUpload/GlobalUpload";
import Upload from "./Pages/Upload/Upload";
import MyUpload from "./Pages/MyUploads/MyUpload";
import MyUploadEdit from "./Pages/MyUploadEdit/MyUploadEdit";
import DeleteConfirmation from "./Pages/DeleteConfirmation/DeleteConfirmation";
import Profile from "./Pages/Profile/Profile";

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
        element: <GlobalUpload />,
      },
      {
        path: "upload",
        element: <Upload />,
      },
      {
        path: "users",
        element: <h1>This is All Users</h1>,
      },
      {
        path: "profile",
        element: <Profile />,
        children: [
          {
            path: "one",
            element: <h1>This is one</h1>,
          },
        ],
      },
      {
        path: "my-upload",
        children: [
          { index: true, element: <MyUpload /> },
          {
            path: "edit/:uploadId",
            element: <MyUploadEdit />,
          },
          {
            path: "delete/confirmation",
            element: <DeleteConfirmation />,
          },
        ],
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
