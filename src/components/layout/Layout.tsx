import "./styles.scss";
import "react-toastify/dist/ReactToastify.css";

import { FC } from "react";
import Header from "../header/Header";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const Layout: FC = () => {
  return (
    <div className="wrapper">
      <ToastContainer position="bottom-right" autoClose={3500} />
      <Header />
      <div className="wrapper__content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
