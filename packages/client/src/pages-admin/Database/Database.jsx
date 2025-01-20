import { Navigate, useOutletContext } from "react-router-dom";
import { useState } from "react";
import TabSelector from "../../components/TabSelector.jsx";
import DatabaseTable from "./DatabaseTable.jsx";
import DatabaseModal from "./DatabaseModal.jsx";
import styles from "./Database.module.css";

/**
 * Database page in admin app
 * @returns {JSX.Element}
 */

function Database() {
  const { auth } = useOutletContext();
  const [activeTab, setActiveTab] = useState("");
  const [rowId, setRowId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(0);

  // Change active tab when new table tab is collected
  function handleTabClick(e) {
    setActiveTab(e.target.id);
  }

  if (!auth) return <Navigate to={"/admin/login"} />;

  return (
    <>
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
        <div className={styles.tableContainer}>
          {!activeTab ? (
            <div style={{ width: "100%", textAlign: "center" }}>
              <p>Select a table above to view and update...</p>
            </div>
          ) : (
            <>
              <DatabaseTable
                table={activeTab}
                setRowId={setRowId}
                setModalOpen={setModalOpen}
                refresh={refresh}
              />
              {modalOpen && (
                <DatabaseModal
                  table={activeTab}
                  rowId={rowId}
                  modalOpen={modalOpen}
                  setModalOpen={setModalOpen}
                  setRefresh={setRefresh}
                />
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Database;
