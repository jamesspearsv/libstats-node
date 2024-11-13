import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useOutletContext } from "react-router-dom";
import Modal from "../../components/Modal.jsx";
import Form from "../../components/Form.jsx";
import Button from "../../components/Button.jsx";

function DatabaseModal({ table, rowId, modalOpen, setModalOpen }) {
  /* Component State */
  const { apihost, auth, setAuth } = useOutletContext();
  const [activeRow, setActiveRow] = useState({});
  const [mode, setMode] = useState(rowId ? "updating" : "adding");

  // fetch row data
  useEffect(() => {
    // (async () => {
    //   try {
    //     // fetch url and options
    //     const url = `${apihost}/admin/${table}/${rowId}`;
    //     const options = {
    //       method: "GET",
    //       headers: {
    //         Authorization: `${auth.token_type} ${auth.token}`,
    //       },
    //     };
    //
    //     const res = await fetch(url, options);
    //     const json = await res.json();
    //
    //     // evaluate response status
    //     if (!res.ok) throw new Error(json.message);
    //
    //     // set activeRow to row fetched by id
    //     setActiveRow(json.row);
    //   } catch (error) {
    //     console.error(error);
    //     if (error.message === "jwt expired") {
    //       setAuth(null);
    //       return toast.error("Session expired");
    //     }
    //     toast.error(error.message);
    //   }
    // })();
  }, [table, rowId]);

  return (
    <Modal isOpen={modalOpen} setIsOpen={setModalOpen} style={{ width: "40%" }}>
      {mode}
    </Modal>
  );
}

export default DatabaseModal;
