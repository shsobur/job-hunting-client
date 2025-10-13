// File__
import Main from "../MainLayout/Main";
import Dashboard from "../DashboardLayout/Dashboard";
import SignIn from "../MainLayout/Pages/Authentication/SignIn/SignIn";
import SignUp from "../MainLayout/Pages/Authentication/SignUp/SignUp";
import UserProfile from "../MainLayout/Pages/UserProfile/UserProfile";
import HomeLayout from "../MainLayout/Pages/HomePageLayout/HomeLayout/HomeLayout";
import RecPostJob from "../DashboardLayout/Pages/Recruiter/RecPostJob/RecPostJob";
import RecruiterProfile from "../MainLayout/Pages/RecruiterProfile/RecruiterProfile";
import RecOverview from "../DashboardLayout/Pages/Recruiter/RecOverview/RecOverview";

// Package__
import { createBrowserRouter } from "react-router-dom";
import AdminOverview from "../DashboardLayout/Pages/Admin/AdminOverview/AdminOverview";
import VerifyCompany from "../DashboardLayout/Pages/Admin/VerifyCompany/VerifyCompany";

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
        element: <RecruiterProfile></RecruiterProfile>,
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
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      // Admin routes__
      {
        path: "/dashboard/admin-overview",
        element: <AdminOverview></AdminOverview>
      },
      {
        path: "/dashboard/verify-company",
        element: <VerifyCompany></VerifyCompany>,
      },

      // Recruiter__
      {
        path: "/dashboard/recruiter-overview",
        element: <RecOverview></RecOverview>,
      },
      {
        path: "/dashboard/recruiter-post-job",
        element: <RecPostJob></RecPostJob>,
      },
    ],
  },
]);

export default router;