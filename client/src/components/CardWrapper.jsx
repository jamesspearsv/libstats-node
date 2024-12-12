import styles from "./CardWrapper.module.css";
import PropTypes from "prop-types";

/**
 * Wrapper to provide UI styling to children
 * @param {JSX.ElementS} children
 * @param {Objest} style - optional React inline styles
 * @returns {JSX.Element}
 */

function CardWrapper({ children, style }) {
  return (
    <div className={styles.card} style={style}>
      {children}
    </div>
  );
}

CardWrapper.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};

export default CardWrapper;
