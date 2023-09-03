import "./style.scss";

import { FC } from "react";
import { Link } from "react-router-dom";
import Menu from "../menu/Menu";
import { toast } from "react-toastify";
import { useUserContext } from "../../hooks/useUserContext";

const Header: FC = () => {
  const { user, logout } = useUserContext();
  return (
    <header className="header">
      <h1 className="header__content">
        <Link className="header__link" to="/">
          Student notebook
        </Link>
      </h1>
      {!!user ? (
        <Menu
          elements={[
            {
              path: "/notes",
              content: "Your notes",
            },
            {
              path: "/logout",
              content: "Logout",
              onClick: () => {
                logout();
                toast.success("Logout sucessfull");
              },
            },
          ]}
        />
      ) : (
        <Menu
          elements={[
            { path: "/login", content: "Login" },
            { path: "/register", content: "Register" },
          ]}
        />
      )}
    </header>
  );
};

export default Header;
