import PropTypes from 'prop-types';
import styles from './CountReport.module.css';

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
  count: PropTypes.array.isRequired,
};
