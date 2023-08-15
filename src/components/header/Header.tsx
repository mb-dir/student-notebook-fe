import { FC } from "react";
import { Link } from "react-router-dom";
import "./style.scss";
import { useUserContext } from "../../hooks/useUserContext";
import Menu from "../menu/Menu";

const Header: FC = () => {
  const { user } = useUserContext();
  return (
    <header className="header">
      <h1 className="header__content">
        <Link className="header__link" to="/">
          Student notebook
        </Link>
      </h1>
      {!!user ? (
        <Menu elements={[{ path: "/logout", content: "Logout" }]} />
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
