import { useEffect } from "react";
import { useLocation, useRoutes } from "react-router";
import { slideToggle } from "./composables/slideToggle.js";
import AppRoute from "./config/app-route.jsx";

function RouterView() {
  const element = useRoutes(AppRoute);
  const location = useLocation();

  useEffect(() => {
    const app = document.querySelector(".app");
    app?.classList.remove("app-sidebar-mobile-toggled");

    const topNav = document.querySelector(".app-top-nav");
    if (topNav?.style.display === "block") {
      slideToggle(topNav);
    }
  }, [location]);

  return element;
}

export default RouterView;
