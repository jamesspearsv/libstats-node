import { Navigate, useOutletContext } from "react-router-dom";
import TabSelector from "../components/TabSelector.jsx";
import { useState, useEffect } from "react";
import Table from "../components/Table.jsx";
import CardWrapper from "../components/CardWrapper.jsx";
import { toast } from "react-hot-toast";

/*
TODO: Extend edit database page in admin area
- [x] Add useEffect to fetch and parse table rows
- [x] Render table rows according to app state
- [ ] Add functionality to view a single row
- [ ] Add ability to update a single row
- [ ] Add loading and error state
 */

function Database() {
  const { apihost, auth } = useOutletContext();
  const [activeTab, setActiveTab] = useState("");
  const [tableRows, setTableRows] = useState([]);
  const [tableColumns, setTableColumns] = useState([]);

  // fetch table rows when activeTab changes
  useEffect(() => {
    (async () => {
      // return if active tab is empty
      if (!activeTab) return;
      try {
        const url = `${apihost}/admin/${activeTab}`;
        const options = {
          method: "GET",
          headers: {
            Authorization: `${auth.token_type} ${auth.token}`,
          },
        };

        const res = await fetch(url, options);
        const json = await res.json();

        if (!res.ok) throw new Error(json.message);

        const arr = Object.keys(json.rows[0]);
        const columns = arr.map((column) => ({ key: column, label: column }));
        setTableColumns(columns);
        setTableRows(json.rows);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    })();
  }, [activeTab]);

  function handleTabClick(e) {
    setActiveTab(e.target.id);
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
        {activeTab && (
          <CardWrapper style={{ width: "95%", margin: "auto" }}>
            <Table
              rows={tableRows}
              columns={tableColumns}
              button={{
                text: "View",
                action: () => {
                  console.log("clicked button");
                },
              }}
            />
          </CardWrapper>
        )}
      </div>
    </>
  );
}

export default Database;
