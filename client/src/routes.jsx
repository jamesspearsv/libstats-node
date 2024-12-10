import App from "./App";
import ErrorComponent from "./components/ErrorComponent.jsx";
import Home from "./pages/Home";
import Record from "./pages/Record";
import Report from "./pages/Report.jsx";
import Admin from "./Admin.jsx";
import Login from "./pages-admin/Login.jsx";
import Dashboard from "./pages-admin/Dashboard/Dashboard.jsx";
import Database from "./pages-admin/Database/Database.jsx";
import Reporting from "./pages-admin/Reporting/Reporting.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "record", element: <Record /> },
      { path: "report", element: <Report /> },
      { path: "*", element: <ErrorComponent status={"404"} /> },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "login", element: <Login /> },
      { path: "database", element: <Database /> },
      { path: "reporting", element: <Reporting /> },
    ],
  },
];

export default routes;
