import PropTypes from "prop-types";
import Form from "../../components/Form.jsx";
import SelectInput from "../../components/SelectInput.jsx";

const categories = [
  { id: "type", value: "Types" },
  { id: "format", value: "Formats" },
  { id: "location", value: "Locations" },
];

function ReportingParams({ params, updateParams }) {
  function handleFormChange(e) {
    console.log("id", e.target.id);
    console.log("value", e.target.value);

    const param = e.target.id;
    const value = e.target.value;

    updateParams(param, value);
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
              id="startMonth"
              type="month"
              name="startMonth"
              value={params.startMonth}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor={"endMonth"} style={{ fontWeight: "bold" }}>
              Ending Month
            </label>
            <input
              id="endMonth"
              type="month"
              value={params.endMonth}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <SelectInput
              label={"Category"}
              options={categories}
              value={params.category}
              handleChange={handleFormChange}
            />
          </div>
        </div>
      </Form>
    </div>
  );
}

ReportingParams.propTypes = {
  params: PropTypes.shape({
    startMonth: PropTypes.string.isRequired,
    endMonth: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
  updateParams: PropTypes.func.isRequired,
};

export default ReportingParams;
