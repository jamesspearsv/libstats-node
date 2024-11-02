import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { toast } from "react-hot-toast";
import CardWrapper from "../components/CardWrapper";
import Button from "../components/Button";
import Error from "../components/Error";

import styles from "./Home.module.css";

function Home() {
  const { apihost, options } = useOutletContext();
  const [effectTrigger, setEffectTrigger] = useState(true);
  const [error, setError] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // fetch data from /dashboard endpoint
    (async () => {
      try {
        const url = `${apihost}/app/summary`;
        const data = await fetch(url);

        if (!data.ok) throw "data error";
        const json = await data.json();

        setCounter(json.count_month);
      } catch (error) {
        console.error(error);
        setError(error);
      }
    })();

    return () => {
      setError(false);
    };
  }, [apihost, effectTrigger]);

  function handleRefresh() {
    const delay = 1000;
    toast.loading("Refreshing", {
      duration: delay,
    });

    setTimeout(() => {
      setEffectTrigger((effectTrigger) => !effectTrigger);
    }, delay);
  }

  if (error) return <Error status={"500"} />;

  // TODO : Build out dashboard with additional metrics
  return (
    <>
      <h1 className={styles.heading}>LibStats</h1>
      <hr className={styles.divider} />
      <div className={styles.container}>
        <div className={styles.quickstartContainer}>
          <div className={styles.quickstart}>
            <h2>Quickstart</h2>
            <p style={{ lineHeight: "1.5" }}>
              LibStats is a simple app that allows you to record, and build
              reports about reference interactions that are completed in the
              library. Click record in the menu to get started. If you have any
              questions speak to your supervisor.
            </p>
          </div>
          <CardWrapper style={{ height: "fit-content", padding: "1.3rem" }}>
            <div className={styles.monthly}>
              <div className={styles.monthly_label}>
                Interactions This Month
              </div>
              <div style={{ minHeight: "25px" }}>
                <div>{counter}</div>
              </div>
              <Button
                text="Refresh"
                type="button"
                variant="primary"
                action={handleRefresh}
                style={{ paddingLeft: "2rem", paddingRight: "2rem" }}
              />
            </div>
          </CardWrapper>
        </div>
        <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>
          Interaction Types
        </h3>
        <div className={styles.types}>
          {options.types.map((type) => (
            <CardWrapper
              key={type.id}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <div style={{ fontWeight: "bold" }}>{type.value}</div>
              <hr />
              <div>{type.desc}</div>
            </CardWrapper>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
