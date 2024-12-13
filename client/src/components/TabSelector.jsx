import PropTypes from "prop-types";
import styles from "./TabSelector.module.css";

/**
 * Custom tab selector component
 * @param {Arry<{id: string, label: string}>} tabs
 * @param {(e: Event) => void} handleClick
 * @param {string} activeTab
 * @returns {JSX.Element}
 * @constructor
 */

function TabSelector({ tabs, handleClick, activeTab }) {
  return (
    <div className={styles.tabContainer}>
      {tabs.map((tab, index) => (
        <div
          key={index}
          id={tab.id}
          className={
            tab.id === activeTab ? `${styles.active}` : `${styles.inactive}`
          }
          onClick={handleClick}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}

TabSelector.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ),
  handleClick: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
};

export default TabSelector;
