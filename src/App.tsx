import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import { Personal } from "./pages/personal";
import { MedicalHistory } from "./pages/medicalHistory";
import { Sintomas } from "./pages/sintomas";
import { LifeStyle } from "./pages/estilo";
import { Results } from "./pages/results";
import { Relatorios } from "./pages/relatorios";
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
        path: "/historico",
        element: <MedicalHistory />,
      },
      {
        path: "/sintomas",
        element: <Sintomas />,
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
        path: "/relatorios",
        element: <Relatorios />,
      },
    ]
  },
]);

export { router };
