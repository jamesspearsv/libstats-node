import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./DashboardStats.module.css";
import CardWrapper from "../../components/CardWrapper.jsx";
import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from "recharts";

function DashboardStats() {
  const { apihost, auth, setAuth } = useOutletContext();
  const [stats, setStats] = useState({});
  const [view, setView] = useState("type");
  const [loading, setLoading] = useState(true);
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#185c36"];

  useEffect(() => {
    //
    (async () => {
      try {
        const url = `${apihost}/admin/stats`;
        const options = {
          method: "GET",
          headers: {
            Authorization: `${auth.token_type} ${auth.token}`,
          },
        };

        const res = await fetch(url, options);
        const json = await res.json();

        // evaluate response status
        // unauthorized request
        if (res.status === 401) {
          toast.error("Session expired");
          return setAuth(null);
        }
        // other bad requests
        if (!res.ok) throw new Error(json.message);

        console.log(json);
        setStats(json);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    })();

    return () => {
      setView("type");
      setLoading(true);
    };
  }, []);

  function handleViewChange(e) {
    const view = e.target.dataset.view;
    setView(view);
  }

  return (
    <div className={styles.container}>
      <div className={styles.views}>
        <button
          data-view={"type"}
          onClick={handleViewChange}
          className={view === "type" ? styles.active : ""}
        >
          Types
        </button>
        <button
          data-view={"location"}
          onClick={handleViewChange}
          className={view === "location" ? styles.active : ""}
        >
          Location
        </button>
        <button
          data-view={"format"}
          onClick={handleViewChange}
          className={view === "format" ? styles.active : ""}
        >
          Format
        </button>
      </div>
      <div className={styles.stats}>
        {!loading && (
          <>
            <CardWrapper>
              <div className={styles.total}>
                Total Interactions: <span>{stats.count_total}</span>
              </div>
              <hr />
              <div className={styles.rows}>
                {stats[`count_${view}`].map((row, index) => (
                  <div key={index} className={styles.row}>
                    <div className={styles.count_value}>
                      <span>{row.id}: </span>
                      <span>{row.value}</span>
                    </div>
                    <div>
                      {row.total_interactions} (
                      {(
                        (parseFloat(row.total_interactions) /
                          parseInt(stats.count_total)) *
                        100
                      ).toFixed()}
                      %)
                    </div>
                  </div>
                ))}
              </div>
            </CardWrapper>
            <CardWrapper>
              <div className={styles.chart}>
                <ResponsiveContainer width="100%" height={275}>
                  <PieChart>
                    <Pie
                      data={stats[`count_${view}`]}
                      dataKey={"total_interactions"}
                      nameKey={"value"}
                      innerRadius={0}
                      label={true}
                    >
                      {stats[`count_${view}`].map((row, index) => (
                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardWrapper>
          </>
        )}
      </div>
    </div>
  );
}

export default DashboardStats;
