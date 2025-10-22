import { createBrowserRouter } from "react-router";
import App from "../App";

import ErrorPage from "../components/shared/ErrorPage";
import WelcomePage from "../components/modules/welcomePage/WelcomePage";
import SignIn from "../components/auth/SignIn";
import SignUp from "../components/auth/SignUp";
import MainLayout from "../components/modules/Main/layout/MainLayout";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        Component: WelcomePage,
      },
      {
        path: "/signin",
        Component: SignIn,
      },
      {
        path: "/signup",
        Component: SignUp,
      },
      {
        path: "/main",
        Component: MainLayout,
      },
    ],
  },
]);
export default router;
