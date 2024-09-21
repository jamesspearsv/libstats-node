import { NavLink } from 'react-router-dom';
import styles from './Nav.module.css';

function Nav() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <NavLink to='/'>
          <li>Home</li>
        </NavLink>
        <NavLink to='/record'>
          <li>Record</li>
        </NavLink>
        <NavLink to='/reports'>
          <li>Reports</li>
        </NavLink>
        <NavLink to='/admin'>
          <li>Admin</li>
        </NavLink>
      </ul>
    </nav>
  );
}

export default Nav;
