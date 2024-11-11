import PropTypes from "prop-types";
import styles from "./Table.module.css";
import Button from "../components/Button.jsx";

/*
 * Component to parse and render a given dataset in a table format
 */

function Table({ rows, columns, style, readonly, button }) {
  return (
    <div className={styles.table} style={style}>
      <div className={styles.row}>
        {/*  Map through the column array to parse and render column headings */}
        {columns.map((column, index) => (
          <div key={index} className={styles.cell}>
            {column.label}
          </div>
        ))}
        {!readonly && (
          <div className={styles.cell}>
            <div>Action</div>
          </div>
        )}
      </div>
      {/*  Map through columns rows and column arrays to parse and render dataset */}
      {rows.map((row, index) => (
        <div key={index} className={styles.row}>
          {columns.map((column, index) => (
            <div key={index} className={styles.cell}>
              {row[column.key]}
            </div>
          ))}
          {!readonly && (
            <div className={styles.cell}>
              <Button
                id={row.id}
                text={button.text}
                type={"button"}
                variant={"primary"}
                action={button.action}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Table;

Table.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }).isRequired,
  ),
  style: PropTypes.object,
  readonly: PropTypes.bool,
  button: PropTypes.shape({
    text: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
  }),
};
