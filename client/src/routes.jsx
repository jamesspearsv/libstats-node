import App from "./App";
import Error from "./components/Error";
import Home from "./pages/Home";
import Record from "./pages/Record";
import Report from "./pages/Report.jsx";
import Admin from "./Admin.jsx";
import Login from "./pages-admin/Login.jsx";
import Dashboard from "./pages-admin/Dashboard.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "record", element: <Record /> },
      { path: "report", element: <Report /> },
      { path: "*", element: <Error status={"404"} /> },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "login", element: <Login /> },
    ],
  },
];

export default routes;
