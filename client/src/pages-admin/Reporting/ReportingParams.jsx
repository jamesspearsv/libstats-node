import PropTypes from "prop-types";
import Form from "../../components/Form.jsx";
import SelectInput from "../../components/SelectInput.jsx";
import DateInput from "../../components/DateInput.jsx";

/**
 * Component to capture admin report params user input
 * @param {{startMonth: string, endMonth: string, category: string}} params Admin report params
 * @param {function} updateParams Callback function to update report params
 * @return {JSX.Element}
 */

const categories = [
  { id: "type", value: "Types" },
  { id: "format", value: "Formats" },
  { id: "location", value: "Locations" },
];

function ReportingParams({ params, updateParams }) {
  function handleFormChange(e) {
    const param = e.target.id;
    const value = e.target.value;
    updateParams(param, value);
  }

  return (
    <div>
      <Form>
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <div>
            <DateInput
              id={"startMonth"}
              label={"Starting Month"}
              type={"month"}
              value={params.startMonth}
              handleChange={handleFormChange}
            />
          </div>
          <div>
            <DateInput
              id={"endMonth"}
              label={"Ending Month"}
              value={params.endMonth}
              type={"month"}
              handleChange={handleFormChange}
            />
          </div>
          <div>
            <SelectInput
              id={"category"}
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
