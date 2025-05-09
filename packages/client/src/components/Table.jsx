import PropTypes from "prop-types";
import styles from "./Table.module.css";
import Button from "../components/Button.jsx";

/*
 * Component to parse and render a given dataset in a table format
 */

/**
 * Table component to parse and render a given dataset
 * @param {Array<Object>} rows - dataset being rendered by table
 * @param {Array<{key: string, label: value}>} columns - array representing columns in given dataset
 * @param {Object} [style] - optional react styles object
 * @param {boolean} [readonly] - boolean value to toggle readonly table mode
 * @param {{text: string, action: (e: Event) => void}} [button] - optional button for editable tables
 * @returns {JSX.Element}
 * @constructor
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
                id={row.id.toString()}
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
