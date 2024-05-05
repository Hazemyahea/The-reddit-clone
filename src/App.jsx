import { useState } from "react";
import { supabase } from "./config/supabasConfig";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages/Auth/Home";
import { Login } from "./pages/Login";
import { Create } from "./pages/Auth/Create";
import Auth from "./pages/Auth/Auth";
import Signup from "./pages/SignUp";
import Profile from "./pages/Auth/Profile";
import ProfileUpdate from "./pages/Auth/ProfileUpdate";
import PostDetails from "./pages/Auth/PostDetails";
import MyProfile from "./pages/Auth/MyProfile";
import AllUsers from "./pages/Auth/AllUsers";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      { path: "/profile/:id", element: <Profile /> },
      { path: "/updateProfile", element: <ProfileUpdate /> },
      { path: "/post/:id", element: <PostDetails /> },
      { path: "/myprofile", element: <MyProfile /> },
      { path: "/allusers", element: <AllUsers /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
]);
export default function App() {
  return <RouterProvider router={router} />;
}
