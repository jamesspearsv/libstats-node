import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import routes from "./routes.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          backgroundColor: "#f5f4f4",
          fontFamily: "Open Sans",
        },
        success: {
          iconTheme: {
            primary: "#185c36",
            secondary: "#ffffff",
          },
        },
        error: {
          style: {
            iconTheme: {
              primary: "#dc3545",
              secondary: "#ffffff",
            },
          },
        },
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>,
);
