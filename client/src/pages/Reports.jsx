// noinspection ExceptionCaughtLocallyJS

import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import toast from "react-hot-toast";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";
import styles from "./Reports.module.css";

//  ** COMPONENTS ** //
import Form from "../components/Form";
import SelectInput from "../components/SelectInput";
import Error from "../components/Error";
import DateInput from "../components/DateInput";
import Table from "../components/Table";
import CountReport from "../components/CountReport";
import CardWrapper from "../components/CardWrapper";
import TabSelector from "../components/TabSelector.jsx";

function Reports() {
  const defaultFormState = {
    start: "",
    end: "",
    location: "",
  };

  const { apihost, options } = useOutletContext();
  const [formState, setFormState] = useState(defaultFormState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [chartType, setChartType] = useState("bar");

  // Report state
  const [report, setReport] = useState({});

  // ** FETCH DATA WHEN SELECTION FORM IS COMPLETE ** //
  useEffect(() => {
    for (const key in formState) {
      // return if form is incomplete
      if (!formState[key]) {
        setLoading(true);
        return;
      }
    }

    if (formState.end < formState.start) return;

    // fetch report date using /report endpoint
    (async () => {
      try {
        const url = `${apihost}/app/report?start=${formState.start}&end=${formState.end}&location=${formState.location}`;

        const res = await fetch(url);
        const json = await res.json();

        if (!res.ok) throw json.error;

        setReport(json);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError(true);
      }
    })();

    return () => {
      setLoading(true);
      setError(false);
    };
  }, [formState, apihost]);

  // ** CHECK THAT START AND END DATE ARE VALID ** //
  useEffect(() => {
    toast.dismiss();
    if (formState.end !== "" && formState.start !== "") {
      if (formState.end < formState.start) {
        setLoading(true);
        toast.error("Start date cannot be after end date", {
          duration: Infinity,
          position: "top-center",
        });
      } else {
        toast.dismiss();
      }
    }

    return () => toast.dismiss();
  }, [formState]);

  function handleSelectChange(e) {
    const value = e.currentTarget.value;
    const updatedState = { ...formState };
    updatedState.location = value;
    setFormState(updatedState);
  }

  function handleDateChange(e) {
    const updatedState = { ...formState };
    if ("start" === e.currentTarget.id) {
      updatedState.start = e.currentTarget.value;
    } else if ("end" === e.currentTarget.id) {
      updatedState.end = e.currentTarget.value;
    } else {
      return;
    }
    setFormState(updatedState);
  }

  function handleChartChange(e) {
    setChartType(e.target.id);
  }

  // early return if any errors
  if (error) return <Error status={"500"} />;

  return (
    <>
      <Form
        style={{
          gap: "0.5rem",
          width: "fit-content",
          margin: "auto",
          height: "fit-content",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
          <DateInput
            label="Start"
            value={formState.start}
            handleChange={handleDateChange}
          />
          <DateInput
            label="End"
            value={formState.end}
            handleChange={handleDateChange}
          />
          <SelectInput
            label="Location"
            options={options.locations}
            handleChange={handleSelectChange}
            value={formState.location}
          />
        </div>
      </Form>

      {loading ? (
        <div className={styles.loading}>
          <h4>Complete the form above to build a report</h4>
          <p>Select a start date, end date, and location</p>
        </div>
      ) : (
        <div style={{ marginTop: "1rem", width: "80%", margin: "auto" }}>
          <div className={styles.reports}>
            <div className={styles.counts}>
              <h4>Total Interactions: {report.count_total}</h4>
              <CountReport title="Types" count={report.count_type} />
              <CountReport title="Formats" count={report.count_format} />
            </div>
            <CardWrapper style={{ width: "100%" }}>
              <h3 className={styles.header}>Daily Interactions</h3>
              <ResponsiveContainer width="100%" height={400}>
                {chartType === "line" ? (
                  <LineChart data={report.count_days}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" height={50} />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey={"number_of_interactions"}
                      stroke="#185c36"
                      strokeWidth={2}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={report.count_days}>
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="date" height={50} />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      type="monotone"
                      dataKey={"number_of_interactions"}
                      fill="#185c36"
                    />
                  </BarChart>
                )}
              </ResponsiveContainer>
              <TabSelector
                tabs={[
                  { id: "bar", label: "Bar Chart" },
                  { id: "line", label: "Line Chart" },
                ]}
                handleClick={handleChartChange}
                activeTab={chartType}
              />
            </CardWrapper>
          </div>
          <div className={styles.table}>
            <CardWrapper style={{ width: "100%" }}>
              <h3 className={styles.header}>
                All Interactions Between {formState.start} and {formState.end}
              </h3>
              <hr />
              {!report.rows[0] ? (
                <p style={{ textAlign: "center" }}>
                  There is nothing to see here...
                </p>
              ) : (
                <Table rows={report.rows} />
              )}
            </CardWrapper>
          </div>
        </div>
      )}
    </>
  );
}

export default Reports;
