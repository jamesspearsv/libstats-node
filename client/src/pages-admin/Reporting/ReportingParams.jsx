import PropTypes from "prop-types";
import CardWrapper from "../../components/CardWrapper.jsx";
import Form from "../../components/Form.jsx";
import SelectInput from "../../components/SelectInput.jsx";
import { useState } from "react";

const categories = [
  { id: "type", value: "Types" },
  { id: "format", value: "Formats" },
  { id: "location", value: "Locations" },
];

function ReportingParams() {
  //   todo : raise state to parent component
  const [params, setParams] = useState({
    startMonth: null,
    endMonth: null,
    category: "",
  });

  function handleCagetoryChange(e) {
    setParams((params) => ({ ...params, category: e.target.value }));
  }

  // todo: finish updater function
  function handleMonthChange(e) {
    return;
  }

  return (
    <div>
      <Form>
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <div>
            <label htmlFor={"startMonth"} style={{ fontWeight: "bold" }}>
              Starting Month
            </label>
            <input
              type="month"
              name="startMonth"
              value={params.startMonth}
              onChange={handleMonthChange}
            />
          </div>
          <div>
            <label htmlFor={"endMonth"} style={{ fontWeight: "bold" }}>
              Ending Month
            </label>
            <input
              type="month"
              value={params.endMonth}
              onChange={handleMonthChange}
            />
          </div>
          <div>
            <SelectInput
              label={"Category"}
              options={categories}
              handleChange={handleCagetoryChange}
              value={params.category}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}

export default ReportingParams;
