import PropTypes from "prop-types";
import styles from "./CountReport.module.css";

/*
 * Component to parse and render a count report:
 *     Count is expected to be an array of objects
 *     Each object having the following properties:
 *     id, value, number_of_interactions
 */

function CountReport({ title, count }) {
  return (
    <div className={styles.report}>
      <h4>{title}</h4>
      <div>
        {count.map((row) => (
          <div key={row.id} className={styles.row}>
            <div>{row.value}</div>
            <div>{row.number_of_interactions}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountReport;

CountReport.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      value: PropTypes.string.isRequired,
      number_of_interactions: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
