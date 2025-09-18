// File__
import Main from "../MainLayout/Main";
import SignIn from "../MainLayout/Pages/Authentication/SignIn/SignIn";
import SignUp from "../MainLayout/Pages/Authentication/SignUp/SignUp";
import HomeLayout from "../MainLayout/Pages/HomePageLayout/HomeLayout/HomeLayout";

// Package__
import { createBrowserRouter } from "react-router-dom";
import UserProfile from "../MainLayout/Pages/UserProfile/UserProfile";
import RecruiterProfile from "../MainLayout/Pages/RecruiterProfile/RecruiterProfile";

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
        path: "/recruiter-profile",
        element: <RecruiterProfile></RecruiterProfile>
      },
      {
        path: "/user-profile",
        element: <UserProfile></UserProfile>,
      },
      {
        path: "/sign-up",
        element: <SignUp></SignUp>,
      },
      {
        path: "/sign-in",
        element: <SignIn></SignIn>,
      },
    ],
  },
]);

export default router;
