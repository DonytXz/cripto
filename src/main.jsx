import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import RouterView from "./router.jsx";

// bootstrap
import "bootstrap";

// css
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "./index.css";
import "./scss/styles.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <RouterView />
    </BrowserRouter>
  </StrictMode>,
);
