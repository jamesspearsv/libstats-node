import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { validateAdminResponse } from "../../lib/response.js";
import { toast } from "react-hot-toast";

function ReportingDisplay({ params }) {
  const { auth, apihost, setAuth } = useOutletContext();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const regex = /[0-9]{4}-[0-9]{2}/;

  useEffect(() => {
    // check that params form is complete
    const { startMonth, endMonth, category } = params;

    // todo : write matching function to validate month inputs in unsupported browsers
    const match = startMonth.match(regex);
    if (!match || match[0] !== startMonth) console.error("no match");
    console.log(match);

    if (!startMonth || !endMonth || !category) return;

    // perform async fetch operation
    (async () => {
      try {
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

  return "Reporting!";
}

ReportingDisplay.propTypes = {
  params: PropTypes.shape({
    startMonth: PropTypes.string.isRequired,
    endMonth: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }),
};

export default ReportingDisplay;
