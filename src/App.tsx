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

/*
{/* <!-- Seção 5: Informações Adicionais --> */
{/* <div className="form-section" id="section5">
<h2>Informações Adicionais</h2>

<div className="form-group">
  <label htmlFor="pregnancies">
    Número de gestações (se aplicável)
  </label>
  <input
    type="number"
    id="pregnancies"
    name="pregnancies"
    min="0"
    max="20"
    value="0"
  />
</div>

<div className="form-group">
  <label htmlFor="skin_thickness">
    Espessura da pele do tríceps (mm)
  </label>
  <input
    type="number"
    id="skin_thickness"
    name="skin_thickness"
    min="10"
    max="100"
  />
</div>

<div className="form-group">
  <label htmlFor="insulin">Nível de insulina (μU/mL)</label>
  <input
    type="number"
    id="insulin"
    name="insulin"
    min="0"
    max="1000"
  />
</div>

<div className="form-group">
  <label htmlFor="notes">Observações adicionais</label>
  <textarea id="notes" name="notes" />
</div>

<div className="navigation">
  <button
    type="button"
    className="btn btn-outline prev-btn"
    data-prev="section4"
  >
    Anterior
  </button>
  <button type="button" id="submitBtn" className="btn btn-primary">
    Enviar e Analisar
  </button>
</div>
</div>
</form>

// {/* <!-- Seção de Resultados --> */}
// <div className="result-section" id="resultSection">
// <h2>Resultado da Análise</h2>
// <p>
// Com base nas informações fornecidas, nosso modelo de machine
// learning identificou:
// </p>

// <div className="result-card" id="resultCard">
// <h3 id="diagnosisTitle">Diagnóstico Preliminar</h3>
// <p id="diagnosisText">Carregando resultados...</p>
// <div id="probabilityMeter"></div>
// <p id="recommendations"></p>
// </div>

// <button type="button" id="restartBtn" className="btn btn-secondary">
// Realizar Nova Análise
// </button>
// </div>
// </div>

// {/* <!-- Conteúdo da aba Resultados --> */}
// <div className="tab-content" id="results-tab">
// <h2>Histórico de Diagnósticos</h2>
// <div className="filters">
// <div className="filter-group">
// <label htmlFor="date-filter">Período</label>
// <select id="date-filter" className="form-control">
//   <option value="7">Últimos 7 dias</option>
//   <option value="30">Últimos 30 dias</option>
//   <option value="90">Últimos 3 meses</option>
//   <option value="365">Último ano</option>
//   <option value="all">Todos</option>
// </select>
// </div>
// <div className="filter-group">
// <label htmlFor="type-filter">Tipo de Diabetes</label>
// <select id="type-filter" className="form-control">
//   <option value="all">Todos</option>
//   <option value="0">Sem diabetes</option>
//   <option value="1">Tipo 1</option>
//   <option value="2">Tipo 2</option>
//   <option value="3">Gestacional</option>
//   <option value="4">Pré-diabetes</option>
// </select>
// </div>
// <div className="filter-group">
// <label htmlFor="risk-filter">Nível de Risco</label>
// <select id="risk-filter" className="form-control">
//   <option value="all">Todos</option>
//   <option value="high">Alto (70%+)</option>
//   <option value="medium">Médio (40-70%)</option>
//   <option value="low">Baixo (0-40%)</option>
// </select>
// </div>
// </div>

// <div className="chart-container">
// <canvas id="diagnosisTrendChart"></canvas>
// </div>

// <table className="data-table">
// <thead>
// <tr>
//   <th>Data</th>
//   <th>Paciente</th>
//   <th>Idade</th>
//   <th>Tipo</th>
//   <th>Probabilidade</th>
//   <th>Nível de Risco</th>
// </tr>
// </thead>
// <tbody id="results-table">
// {/* <!-- Dados serão preenchidos via JavaScript --> */}
// </tbody>
// </table>
// </div>

// {/* <!-- Conteúdo da aba Relatórios --> */}
// <div className="tab-content" id="reports-tab">
// <h2>Relatórios Estatísticos</h2>

// <div className="report-grid">
// <div className="stats-card">
// <h3>Total de Diagnósticos</h3>
// <div className="stats-value" id="total-diagnoses">
//   0
// </div>
// <div className="stats-label">Desde o início do sistema</div>
// </div>

// <div className="stats-card">
// <h3>Casos de Diabetes</h3>
// <div className="stats-value" id="diabetes-cases">
//   0
// </div>
// <div className="stats-label">Confirmados pelo sistema</div>
// </div>

// <div className="stats-card">
// <h3>Média de Idade</h3>
// <div className="stats-value" id="average-age">
//   0
// </div>
// <div className="stats-label">Dos pacientes diagnosticados</div>
// </div>

// <div className="stats-card">
// <h3>Taxa de Risco</h3>
// <div className="stats-value" id="high-risk-rate">
//   0%
// </div>
// <div className="stats-label">Casos de alto risco</div>
// </div>
// </div>

// <div className="chart-container">
// <h3>Distribuição por Tipo de Diabetes</h3>
// <canvas id="diabetesDistributionChart"></canvas>
// </div>

// <div className="chart-container">
// <h3>Fatores de Risco Mais Comuns</h3>
// <canvas id="riskFactorsChart"></canvas>
// </div>

// <div className="chart-container">
// <h3>Evolução Mensal de Casos</h3>
// <canvas id="monthlyTrendChart"></canvas>
// </div>
// </div>
// </div>
// */ */}