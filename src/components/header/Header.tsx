import { Link } from "react-router-dom";
import "./style.scss";
type Props = {};

const Header = (props: Props) => {
  return (
    <header className="header">
      <h1 className="header__content">
        <Link className="header__link" to="/">
          Student notebook
        </Link>
      </h1>
      <nav className="nav">
        <ul className="menu">
          <li className="menu__element">
            <Link className="menu__link" to="/login">
              Login
            </Link>
          </li>
          <li className="menu__element">
            <Link className="menu__link" to="/register">
              Register
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
