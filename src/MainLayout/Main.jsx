// File__
import Navbar from "./Shared/Navbar/Navbar";
import Footer from "./Shared/Footer/Footer";

// Package__
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default Main;