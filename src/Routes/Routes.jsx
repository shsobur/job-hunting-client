// File__
import Main from "../MainLayout/Main";
import SignUp from "../MainLayout/Pages/Authentication/SignUp/SignUp";
import HomeLayout from "../MainLayout/Pages/HomePageLayout/HomeLayout/HomeLayout";

// Package__
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <HomeLayout></HomeLayout>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>
       }
    ],
  },
]);

export default router;