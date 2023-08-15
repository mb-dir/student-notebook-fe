import "./styles.scss";
import { Outlet } from "react-router";
import { FC } from "react";
import Header from "../header/Header";

const Layout: FC = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="wrapper__content">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
