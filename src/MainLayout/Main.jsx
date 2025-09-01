// File__
import Navbar from "./Shared/Navbar/Navbar";
import Footer from "./Shared/Footer/Footer";

// Package__
import { Outlet, useLocation } from "react-router-dom";
import ProgressBar from "../Components/ProgressBar/ProgressBar";

const Main = () => {
  // eslint-disable-next-line no-unused-vars
  const path = useLocation();

  return (
    <>
      <ProgressBar></ProgressBar>
      {/* {
        path.pathname !== "/sign-up" && <Navbar></Navbar>
      } */}
      <Navbar></Navbar>
      
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Main;
