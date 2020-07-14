import { Link } from 'gatsby';
import React from 'react';
import menuStyle from './menu.module.scss';

const Menu = ({ data: menu }) => {

  const menuBlock = (
    <ul className={menuStyle.menuList}>
      {menu.map(item => (
        <li className={menuStyle.menuListItem} key={item.path}>
          <Link
            to={item.path}
            className={menuStyle.menuListItemLink}
            activeClassName={`${menuStyle.menuListItemLink} ${menuStyle.menuListItemLinkActive}`}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );

  return <nav className="menu">{menuBlock}</nav>;
};

export default Menu;
