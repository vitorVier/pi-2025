import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Personal } from "./pages/personal";
import { MedicalHistory } from "./pages/medicalHistory";
import { Symptoms } from "./pages/symptoms";
import { LifeStyle } from "./pages/lifeStyle";
import { Results } from "./pages/results/index";
import { Reports } from "./pages/reports";
import { AddInformation } from "./pages/addInformation";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Personal />,
      },
      {
        path: "/medicalHistory",
        element: <MedicalHistory />,
      },
      {
        path: "/symptoms",
        element: <Symptoms />,
      },
      {
        path: "/lifeStyle",
        element: <LifeStyle />,
      },
      {
        path: "/addInformation",
        element: <AddInformation />,
      },
      {
        path: "/results",
        element: <Results />,
      },
      {
        path: "/reports",
        element: <Reports />,
      },
    ]
  },
]);

export { router };
