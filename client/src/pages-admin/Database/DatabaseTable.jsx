/*
Table wrapper component for Database.jsx.
Responsible for fetching and rendering table rows using the app's table component.
 */

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-hot-toast";
import CardWrapper from "../../components/CardWrapper.jsx";
import Table from "../../components/Table.jsx";
import Button from "../../components/Button.jsx";

function DatabaseTable({ table, setRowId, setModalOpen, refresh }) {
  const { apihost, auth, setAuth } = useOutletContext();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // fetch table rows when activeTab changes
  useEffect(() => {
    (async () => {
      // return if active tab is empty
      if (!table) return;
      try {
        // fetch url and options
        const url = `${apihost}/admin/${table}`;
        const options = {
          method: "GET",
          headers: {
            Authorization: `${auth.token_type} ${auth.token}`,
          },
        };

        // fetch and parse response
        const res = await fetch(url, options);
        const json = await res.json();

        // Evaluate response status
        if (res.status === 401) {
          return setAuth(null);
        } else if (!res.ok) throw new Error(json.message);

        // set table rows and table columns from fetch data
        const arr = Object.keys(json.rows[0]); // parse table columns from rows[0] in table
        const columns = arr.map((column) => ({ key: column, label: column }));
        setColumns(columns);
        setRows(json.rows);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        toast.error(error.message);
      }
    })();

    return () => {
      setColumns([]);
      setRows([]);
      setLoading(true);
      setError(false);
    };
  }, [table, refresh]);

  function handleViewClick(e) {
    setRowId(e.target.dataset.id);
    setModalOpen(true);
  }

  function handleAddClick() {
    setRowId(null);
    setModalOpen(true);
  }

  if (loading) return null;
  if (error) return "Something went wrong...";

  return (
    <>
      <CardWrapper style={{ width: "95%", margin: "auto" }}>
        <Table
          rows={rows}
          columns={columns}
          button={{
            text: "View",
            action: handleViewClick,
          }}
        />
      </CardWrapper>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "1rem" }}
      >
        <Button
          text={"Add New Row"}
          variant={"primary"}
          type={"button"}
          action={handleAddClick}
        />
      </div>
    </>
  );
}

DatabaseTable.propTypes = {
  table: PropTypes.string.isRequired,
  setRowId: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  refresh: PropTypes.number.isRequired,
};

export default DatabaseTable;
