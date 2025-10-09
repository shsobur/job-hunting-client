// File__
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

// Package__
import { Outlet, useLocation } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar/ProgressBar";

const Main = () => {
  const path = useLocation();

  return (
    <>
      <ProgressBar></ProgressBar>
      <Navbar></Navbar>
      <Outlet></Outlet>
      {path?.pathname !== "/user-profile" && path?.pathname !== "/recruiter-profile" && <Footer></Footer>}
    </>
  );
};

export default Main;
