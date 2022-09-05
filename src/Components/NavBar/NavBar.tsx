import React from "react";
import { NavLink } from "react-router-dom";

import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <nav className = { styles.nav }>
      <NavLink to={'./login'} className = { styles.link }>Login</NavLink>
      <NavLink to={'./signup'} className = { styles.link } >SignUp</NavLink>
      <NavLink to={'./short-links'} className = { styles.link } >Main page</NavLink>
    </nav>
  )
}

export default NavBar;