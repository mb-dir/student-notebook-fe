import "./style.scss";

import { FC } from "react";
import { Link } from "react-router-dom";

type menuElement = {
  path: string;
  content: string;
};

interface MenuProps {
  elements: menuElement[];
}

const Menu: FC<MenuProps> = ({ elements }: MenuProps) => {
  return (
    <nav className="nav">
      <ul className="menu">
        {elements.map(el => {
          return (
            <li key={el.content} className="menu__element">
              <Link className="menu__link" to={el.path}>
                {el.content}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Menu;
