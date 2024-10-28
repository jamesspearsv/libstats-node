import PropTypes from "prop-types";
import styles from "./Table.module.css";

/*
 * Component to parse and render a table of interactions:
 *     Rows prop is required and expected to be an array of objects representing interactions.
 *     Each row in rows should contain the following properties: id, type, format, locations, and date
 */

function Table({ rows }) {
  return (
    <div className={styles.table}>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Format</th>
            <th>Location</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>{row.id}</td>
              <td>{row.type}</td>
              <td>{row.format}</td>
              <td>{row.location}</td>
              <td>{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
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
