/*
Modal wrapper component for Database.jsx
Responsible for fetching, rendering row data.
Contains functions handling user updating and adding to database.
 */

import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-hot-toast";
import Modal from "../../components/Modal.jsx";
import Form from "../../components/Form.jsx";
import Button from "../../components/Button.jsx";

function DatabaseModal({ table, rowId, modalOpen, setModalOpen, setRefresh }) {
  /* Component State */
  const { apihost, auth, setAuth } = useOutletContext();
  const [activeRow, setActiveRow] = useState({});
  const [mode] = useState(rowId ? "updating" : "adding");
  const [formFields, setFormFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  // fetch row data
  useEffect(() => {
    (async () => {
      try {
        // fetch url and options
        const url =
          mode === "updating"
            ? `${apihost}/admin/${table}/${rowId}`
            : `${apihost}/admin/${table}/1`;

        const options = {
          method: "GET",
          headers: {
            Authorization: `${auth.token_type} ${auth.token}`,
          },
        };

        const res = await fetch(url, options);
        const json = await res.json();

        // evaluate response status
        // todo: extract logic into utility function
        if (res.status === 401) {
          return setAuth(null);
        } else if (!res.ok) throw new Error(json.message);

        // set activeRow to row fetched by id
        const fields = Object.keys(json.row);
        setFormFields(fields);

        if (mode === "adding") {
          fields.forEach((field) => {
            json.row[field] = "";
          });
        }

        setActiveRow(json.row);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
        toast.error(error.message);
      }
    })();

    return () => {
      setLoading(true);
      setError(false);
    };
  }, []);

  function handleFormChange(e) {
    const row = { ...activeRow };
    row[e.target.name] = e.target.value;
    setActiveRow(row);
  }

  // Submit form
  function submitForm(e) {
    e.preventDefault();
    const elements = e.target.elements;
    const data = {};
    formFields.forEach((field) => {
      if (field === "id") return;
      data[field] = elements[field].value;
    });

    try {
      (async () => {
        // select appropriate endpoint based on mode
        const url =
          mode === "updating"
            ? `${apihost}/admin/${table}/${rowId}`
            : `${apihost}/admin/${table}`;

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
        setRefresh(Math.random());
      })();
    } catch (error) {
      console.error(error);
      if (error.message === "jwt expired") {
        setAuth(null);
        toast.error("Session expired");
      } else {
        toast.error(error.message);
      }
    }
  }

  if (loading) return null;
  if (error) return "Something went wrong...";

  return (
    <Modal
      isOpen={modalOpen}
      setIsOpen={setModalOpen}
      style={{ width: "fit-content" }}
    >
      <Form
        title={mode === "updating"}
        onSubmit={submitForm}
        style={{
          width: "100%",
          backgroundColor: "transparent",
          boxShadow: "none",
        }}
      >
        {formFields.map((field, index) => {
          if (field === "id") return;
          return (
            <div key={index}>
              <label htmlFor={field}>{field}</label>
              {field !== "desc" ? (
                <input
                  type="text"
                  name={field}
                  value={activeRow[field]}
                  onChange={handleFormChange}
                  required={true}
                />
              ) : (
                <textarea
                  name={field}
                  cols="35"
                  rows="10"
                  value={activeRow[field]}
                  onChange={handleFormChange}
                ></textarea>
              )}
            </div>
          );
        })}
        <Button text={"Submit"} type={"submit"} variant={"primary"} />
      </Form>
    </Modal>
  );
}

DatabaseModal.propTypes = {
  table: PropTypes.string.isRequired,
  rowId: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  setRefresh: PropTypes.func.isRequired,
};

export default DatabaseModal;
