import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { validateAdminResponse } from "../../lib/response.js";
import { toast } from "react-hot-toast";
import parseMonthInput from "../../lib/parseMonthInput.js";
import CardWrapper from "../../components/CardWrapper.jsx";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#185c36"];

/**
 * A React component to fetch and render admin report data
 * @param {{startMonth: string, endMonth: string, categoy: string}} params Parameters for admin report
 * @returns {JSX.Element}
 */

function ReportingDisplay({ params }) {
  const { auth, apihost, setAuth } = useOutletContext();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // perform async fetch operation
    (async () => {
      try {
        // check that params form is complete
        const { startMonth, endMonth, category } = params;
        // early return if form is incomplete
        if (!startMonth || !endMonth || !category) return;

        const results = parseMonthInput([startMonth, endMonth]);
        if (results.includes(false))
          throw new Error("Months must be in YYYY-MM format");

        // define fetch url and options
        const url = `${apihost}/admin/report?startMonth=${startMonth}&endMonth=${endMonth}&category=${category}`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${auth.token_type} ${auth.token}`,
          },
        };

        const res = await fetch(url, options);
        const json = await res.json();

        // validate API response
        validateAdminResponse(res, json, setAuth);

        console.log(json);

        setReport(json);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.error(error);
        toast.error(error.message);
        setLoading(false);
        setError({ message: error.message });
      }

      // clean up state
      return () => {
        setReport(null);
        setLoading(true);
        setError(null);
      };
    })();
  }, [params]);

  //   if params are incomplete or error has occurred
  if (loading) return <div>Set your report parameters above</div>;
  if (error) return <div>Error loading report -- {error.message}</div>;

  return (
    <div style={{ width: "100%", margin: "0 2.5rem" }}>
      <div
        style={{ width: "75%", margin: "auto", display: "flex", gap: "2rem" }}
      >
        <CardWrapper
          style={{
            flex: 1,
            textAlign: "center",
            alignContent: "center",
          }}
        >
          <div style={{ fontWeight: "bold" }}>Total Interactions</div>
          <div>{report.total_interactions}</div>
        </CardWrapper>
        {/* todo : extract into separate component */}
        <CardWrapper style={{ flex: 2 }}>
          <ResponsiveContainer width="100%" height={275}>
            <PieChart>
              <Pie
                data={report.total_detailed}
                dataKey={"number_of_interactions"}
                nameKey={"value"}
                label={false}
                labelLine={false}
                animationBegin={0}
                animationDuration={1000}
              >
                {report.total_detailed.map((row, index) => (
                  <Cell key={row.id} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout={"vertical"}
                verticalAlign={"middle"}
                align={"right"}
                content={() => (
                  <ul style={{ listStyle: "none", padding: "1rem" }}>
                    {report.total_detailed.map((row, index) => (
                      <li
                        key={row.id}
                        style={{
                          color: COLORS[index % COLORS.length],
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "1rem",
                          padding: ".25rem 0",
                        }}
                      >
                        <span>{row.value}</span>
                        <span>
                          {row.number_of_interactions} (
                          {(
                            (row.number_of_interactions /
                              report.total_interactions) *
                            100
                          ).toFixed()}
                          %)
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardWrapper>
      </div>
    </div>
  );
}

ReportingDisplay.propTypes = {
  params: PropTypes.shape({
    startMonth: PropTypes.string.isRequired,
    endMonth: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
};

export default ReportingDisplay;
