import { Navigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Table from "../components/Table.jsx";
import CardWrapper from "../components/CardWrapper.jsx";
import Modal from "../components/Modal.jsx";
import Form from "../components/Form.jsx";
import Button from "../components/Button.jsx";
import TabSelector from "../components/TabSelector.jsx";

function Database() {
  const { apihost, auth, setAuth } = useOutletContext();
  // state for parsing and displaying full tables
  const [activeTab, setActiveTab] = useState("");
  const [tableRows, setTableRows] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);
  // state for parsing, displaying, updating, and adding single rows
  const [rowId, setRowId] = useState(null);
  const [activeRow, setActiveRow] = useState({});
  const [mode, setMode] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  // state trigger to rerender component
  const [effectTrigger, setEffectTrigger] = useState(false);

  // fetch table rows when activeTab changes
  useEffect(() => {
    (async () => {
      // return if active tab is empty
      if (!activeTab) return;
      try {
        // fetch url and options
        const url = `${apihost}/admin/${activeTab}`;
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
        setTableColumns(columns);
        setTableRows(json.rows);
      } catch (error) {
        console.error(error);
        if (error.message === "jwt expired") {
          setAuth(null);
          return toast.error("Session expired");
        }
        toast.error(error.message);
      }
    })();
  }, [activeTab, effectTrigger]);

  // fetch row data when view button is clicked in table
  useEffect(() => {
    (async () => {
      if (!rowId) return;
      try {
        // fetch url and options
        const url = `${apihost}/admin/${activeTab}/${rowId}`;
        const options = {
          method: "GET",
          headers: {
            Authorization: `${auth.token_type} ${auth.token}`,
          },
        };

        const res = await fetch(url, options);
        const json = await res.json();

        // evaluate response status
        if (!res.ok) throw new Error(json.message);

        // set activeRow to row fetched by id
        setActiveRow(json.row);
      } catch (error) {
        console.error(error);
        if (error.message === "jwt expired") {
          setAuth(null);
          return toast.error("Session expired");
        }
        toast.error(error.message);
      }
    })();
  }, [rowId]);

  // Reset modal and row state when modal is closed
  useEffect(() => {
    // skip effect if modal state is set to closed
    if (!modalOpen) {
      setRowId(null);
      setActiveRow({});
      setMode(null);
    }
  }, [modalOpen]);

  // Change active tab when new table tab is collected
  function handleTabClick(e) {
    setActiveTab(e.target.id);
  }

  // Open detailed view modal when view button is clicked
  function handleViewClick(e) {
    setMode("updating");
    setRowId(e.target.dataset.id);
    setModalOpen(true);
  }

  // Open modal when add button is clicked
  function handleAddClick() {
    setMode("adding");
    setModalOpen(true);

    let row = {};
    tableColumns.map((column) => {
      if (column.key === "id") return;
      row[column.key] = "";
    });
    setActiveRow(row);
  }

  // update activeRow state when modal form field is edited
  function handleFormChange(e) {
    let updatedRow = { ...activeRow };
    updatedRow[e.target.name] = e.target.value;
    setActiveRow(updatedRow);
  }

  // handle form submission
  function handleFormSubmit(e) {
    e.preventDefault();
    const elements = e.target.elements;
    let data = {};
    // parse table columns into row object with appropriate properties and values
    tableColumns.map((column) => {
      if (column.key === "id") return; // skip id column
      data[column.key] = elements[column.key].value;
    });

    // submit for and ping appropriate endpoints based on mode
    try {
      (async () => {
        const url =
          mode === "updating"
            ? `${apihost}/admin/${activeTab}/${rowId}`
            : `${apihost}/admin/${activeTab}`;

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${auth.token_type} ${auth.token}`,
          },
          body: JSON.stringify(data),
        };

        const res = await fetch(url, options);
        const json = await res.json();

        if (!res.ok) throw new Error(json.message);

        toast.success(json.message);
        setModalOpen(false);
        setEffectTrigger((effectTrigger) => !effectTrigger);
      })();
    } catch (error) {
      console.error(error);
      if (error.message === "jwt expired") {
        setAuth(null);
        return toast.error("Session expired");
      }
      toast.error(error.message);
    }
  }

  if (!auth) return <Navigate to={"/admin/login"} />;

  return (
    <>
      <h1>Edit Database</h1>
      <div>
        <TabSelector
          handleClick={handleTabClick}
          activeTab={activeTab}
          tabs={[
            { id: "types", label: "Types" },
            { id: "locations", label: "Locations" },
            { id: "formats", label: "Formats" },
          ]}
        />
        <div>
          {!activeTab ? (
            <p>Select a table above to view and update...</p>
          ) : (
            <>
              <CardWrapper style={{ width: "95%", margin: "auto" }}>
                <Table
                  rows={tableRows}
                  columns={tableColumns}
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
          )}
        </div>
      </div>
      <Modal
        isOpen={modalOpen}
        setIsOpen={setModalOpen}
        style={{ width: "40%" }}
      >
        {activeRow && (
          <Form
            title={
              mode === "updating"
                ? `Update row in ${activeTab}`
                : `Add row to ${activeTab}`
            }
            onSubmit={handleFormSubmit}
            style={{ width: "100%" }}
          >
            {tableColumns.map((column, index) => {
              if (column.key === "id") return;
              return (
                <div key={index}>
                  <label htmlFor={column.key}>{column.key}</label>
                  {column.key === "desc" ? (
                    <textarea
                      name={column.key}
                      cols="30"
                      rows="10"
                      value={activeRow[column.key]}
                      onChange={handleFormChange}
                      required
                      autoComplete={"off"}
                    />
                  ) : (
                    <input
                      type="text"
                      name={column.key}
                      value={activeRow[column.key]}
                      onChange={handleFormChange}
                      required
                      autoComplete={"off"}
                    />
                  )}
                </div>
              );
            })}
            <Button
              text={mode === "updating" ? "Update" : "Add"}
              variant={"primary"}
              type={"submit"}
            />
          </Form>
        )}
      </Modal>
    </>
  );
}

export default Database;
