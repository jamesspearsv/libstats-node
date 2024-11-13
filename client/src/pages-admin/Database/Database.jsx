import { Navigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import Modal from "../../components/Modal.jsx";
import Form from "../../components/Form.jsx";
import Button from "../../components/Button.jsx";
import TabSelector from "../../components/TabSelector.jsx";
import DatabaseTable from "./DatabaseTable.jsx";
import DatabaseModal from "./DatabaseModal.jsx";

function Database() {
  const { apihost, auth, setAuth } = useOutletContext();
  const [activeTab, setActiveTab] = useState(null);
  const [rowId, setRowId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // // Reset modal and row state when modal is closed
  // useEffect(() => {
  //   // skip effect if modal state is set to closed
  //   if (!modalOpen) {
  //     setRowId(null);
  //   }
  // }, [modalOpen]);

  // Change active tab when new table tab is collected
  function handleTabClick(e) {
    setActiveTab(e.target.id);
  }

  // // Open detailed view modal when view button is clicked
  // function handleViewClick(e) {
  //   setMode("updating");
  //   setRowId(e.target.dataset.id);
  //   setModalOpen(true);
  // }
  //
  // // Open modal when add button is clicked
  // function handleAddClick() {
  //   setMode("adding");
  //   setModalOpen(true);
  //
  //   let row = {};
  //   tableColumns.map((column) => {
  //     if (column.key === "id") return;
  //     row[column.key] = "";
  //   });
  //   setActiveRow(row);
  // }

  // update activeRow state when modal form field is edited
  // function handleFormChange(e) {
  //   let updatedRow = { ...activeRow };
  //   updatedRow[e.target.name] = e.target.value;
  //   setActiveRow(updatedRow);
  // }

  // handle form submission
  // function handleFormSubmit(e) {
  //   e.preventDefault();
  //   const elements = e.target.elements;
  //   let data = {};
  //   // parse table columns into row object with appropriate properties and values
  //   tableColumns.map((column) => {
  //     if (column.key === "id") return; // skip id column
  //     data[column.key] = elements[column.key].value;
  //   });
  //
  //   // submit for and ping appropriate endpoints based on mode
  //   try {
  //     (async () => {
  //       const url =
  //         mode === "updating"
  //           ? `${apihost}/admin/${activeTab}/${rowId}`
  //           : `${apihost}/admin/${activeTab}`;
  //
  //       const options = {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `${auth.token_type} ${auth.token}`,
  //         },
  //         body: JSON.stringify(data),
  //       };
  //
  //       const res = await fetch(url, options);
  //       const json = await res.json();
  //
  //       if (!res.ok) throw new Error(json.message);
  //
  //       toast.success(json.message);
  //       setModalOpen(false);
  //       setEffectTrigger((effectTrigger) => !effectTrigger);
  //     })();
  //   } catch (error) {
  //     console.error(error);
  //     if (error.message === "jwt expired") {
  //       setAuth(null);
  //       return toast.error("Session expired");
  //     }
  //     toast.error(error.message);
  //   }
  // }

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
              <DatabaseTable
                table={activeTab}
                setRowId={setRowId}
                setModalOpen={setModalOpen}
              />
              {/*{modalOpen && (*/}
              <DatabaseModal
                table={activeTab}
                rowId={rowId}
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
              />
              {/*)}*/}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Database;
