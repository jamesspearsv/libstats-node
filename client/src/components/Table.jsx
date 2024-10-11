import PropTypes from 'prop-types';
import styles from './Table.module.css';

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
  rows: PropTypes.array.isRequired,
};
