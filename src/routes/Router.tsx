import { createBrowserRouter } from "react-router";
import App from "../App";
import Home from "../components/modules/home/Home";
import ErrorPage from "../components/shared/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        Component: Home,
      },
    ],
  },
]);
export default router;
