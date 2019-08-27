import React from "react";
import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";

const Header = () => (
  <header className={styles.header}>
    <p className={styles.logo}>
      <NavLink exact={true} to="/">
        Spellathon Prep
      </NavLink>
    </p>

    <nav className={styles.nav}>
      <NavLink
        className={styles.navItem}
        exact={true}
        activeClassName={styles.navActive}
        to="/"
      >
        Practice
      </NavLink>
      <NavLink
        className={styles.navItem}
        activeClassName={styles.navActive}
        to="/stats"
      >
        Stats
      </NavLink>
      <NavLink
        className={styles.navItem}
        activeClassName={styles.navActive}
        to="/words"
      >
        Word List
      </NavLink>
    </nav>
  </header>
);

export default Header;
