import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import CardWrapper from "../../components/CardWrapper.jsx";
import Table from "../../components/Table.jsx";
import Button from "../../components/Button.jsx";
import { toast } from "react-hot-toast";

function DatabaseTable({ table, setRowId, setModalOpen }) {
  const { apihost, auth, setAuth } = useOutletContext();
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

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
        if (!res.ok) throw new Error(json.message);

        // set tableRows and tableColumns from fetch data
        const arr = Object.keys(json.rows[0]); // parse table columns from rows[0] in table
        const columns = arr.map((column) => ({ key: column, label: column }));
        setColumns(columns);
        setRows(json.rows);
      } catch (error) {
        console.error(error);
        if (error.message === "jwt expired") {
          setAuth(null);
          return toast.error("Session expired");
        }
        toast.error(error.message);
      }
    })();
  }, [table]);

  function handleViewClick(e) {
    setRowId(e.target.dataset.id);
    setModalOpen(true);
  }

  function handleAddClick() {
    setRowId(null);
    setModalOpen(true);
  }

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
      <Button
        text={"Add New Row"}
        variant={"primary"}
        type={"button"}
        action={handleAddClick}
      />
    </>
  );
}

export default DatabaseTable;
