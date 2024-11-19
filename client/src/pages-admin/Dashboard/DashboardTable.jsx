import Table from "../../components/Table.jsx";
import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

function DashboardTable() {
  const { apihost, auth, setAuth } = useOutletContext();

  useEffect(() => {
    (async () => {
      try {
        //   todo: build this route in API
        const url = `${apihost}/admin/interactions`;
        const options = {
          method: "GET",
          headers: {
            Authorization: `${auth.token_type} ${auth.token}`,
          },
        };

        //   todo: finish fetch request
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    })();
  }, []);

  return <div></div>;
}

export default DashboardTable;
