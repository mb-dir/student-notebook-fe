import "./style.scss";

import { FC } from "react";
import { NavLink } from "react-router-dom";

type menuElement = {
  path: string;
  content: string;
  onClick?: () => void;
};

type MenuProps = {
  elements: menuElement[];
};

const Menu: FC<MenuProps> = ({ elements }: MenuProps) => {
  return (
    <nav className="nav">
      <ul className="menu">
        {elements.map((el) => {
          return (
            <li key={el.content} className="menu__element">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "menu__link menu__link--active" : "menu__link"
                }
                to={el.path}
                onClick={el?.onClick}
              >
                {el.content}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
