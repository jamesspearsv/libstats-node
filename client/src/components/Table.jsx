import PropTypes from "prop-types";
import styles from "./Table.module.css";

/*
 * Component to parse and render a table of interactions
 */

function Table({ rows }) {
  return (
    <div className={styles.table}>
      <div className={styles.row}>
        <div className={styles.cell}>ID</div>
        <div className={styles.cell}>Type</div>
        <div className={styles.cell}>Format</div>
        <div className={styles.cell}>Location</div>
        <div className={styles.cell}>Date</div>
      </div>
      {rows.map((row, index) => (
        <div key={index} className={styles.row}>
          <div className={styles.cell}>{row.id}</div>
          <div className={styles.cell}>{row.type}</div>
          <div className={styles.cell}>{row.format}</div>
          <div className={styles.cell}>{row.location}</div>
          <div className={styles.cell}>{row.date}</div>
        </div>
      ))}
    </div>
  );
}

export default Table;

Table.propTypes = {
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      type: PropTypes.string.isRequired,
      format: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
