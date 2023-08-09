import "./styles.scss";
import { Outlet } from "react-router";
import Header from "../header/Header";
type Props = {};

const Layout = (props: Props) => {
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