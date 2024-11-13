import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import styles from "./Nav.module.css";

/* App navigation menu */

function Nav({ navItems }) {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list} id="list">
        {navItems.map((item, index) => (
          <NavLink key={index} to={item.route}>
            {item.label}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

Nav.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      route: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Nav;
