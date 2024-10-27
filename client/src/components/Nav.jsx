import { NavLink } from "react-router-dom";
import styles from "./Nav.module.css";

/* App navigation menu */

function Nav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list} id="list">
        <NavLink to="/">LibStats</NavLink>
        <NavLink to="/record">Record</NavLink>
        <NavLink to="/reports">Reports</NavLink>
      </ul>
    </nav>
  );
}

export default Nav;
