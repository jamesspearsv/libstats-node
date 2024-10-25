import App from "./App";
import Error from "./components/Error";
import Home from "./pages/Home";
import Record from "./pages/Record";
import Reports from "./pages/Reports";

const routes = [
  {
    path: "/",
    element: <App />,
    errorBoundary: <Error status={"500"} />,
    children: [
      { index: true, element: <Home /> },
      { path: "record", element: <Record /> },
      { path: "reports", element: <Reports /> },
      { path: "admin", element: "TODO -- Admin Dashboard" },
      { path: "*", element: <Error status={"404"} /> },
    ],
  },
];

export default routes;
