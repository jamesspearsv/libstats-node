import styles from "./CardWrapper.module.css";
import PropTypes from "prop-types";

/* Wrapper to provide UI styling to elements */

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
