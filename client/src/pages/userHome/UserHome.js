import React from "react";
import UserNavBar from "../../components/userNavBar/UserNavBar";
import { Outlet } from "react-router-dom";
import "./UserHome.scss";
import Footer from "../../components/footer/Footer";
import NavBar from "../../components/navBar/NavBar";

function UserHome() {
  return (
    <>
      <UserNavBar />
      {/* <NavBar /> */}
      <Outlet />
      {/* <Footer /> */}
    </>
  );
}

export default UserHome;
