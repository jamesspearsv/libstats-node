import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function DashboardStats() {
  const { apihost, auth, setAuth } = useOutletContext();
  const [stats, setStats] = useState({});

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
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  return <>Dashboard Stats</>;
}

export default DashboardStats;
