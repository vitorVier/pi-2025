import { useEffect, useState } from "react";

export function Reports() {
  const [data, setData] = useState({
    totalDiagnosticos: 0,
    casosDiabetes: 0,
    idadeavg: 0,
    risco: 0,
  });

  // Função que busca dados no backend
  const carregarRelatorio = () => {
    fetch("http://localhost:5000/relatorio")
      .then((res) => res.json())
      .then((resData) => {
        setData({
          totalDiagnosticos: resData.total_diagnosticos,
          casosDiabetes: resData.casos_diabetes,
          idadeavg: resData.idadeavg,
          risco: resData.risco,
        });
      })
      .catch((err) => {
        console.error("Erro ao buscar relatório:", err);
      });
  };

  // Hook para carregar inicialmente e escutar evento de atualização
  useEffect(() => {
    carregarRelatorio();

    window.addEventListener("atualizarRelatorio", carregarRelatorio);
    return () => {
      window.removeEventListener("atualizarRelatorio", carregarRelatorio);
    };
  }, []);

  return (
    <div className="tab-content" id="reports-tab">
      <h2>Relatórios Estatísticos</h2>

      <div className="report-grid">
        <div className="stats-card">
          <h3>Total de Diagnósticos</h3>
          <div className="stats-value">{data.totalDiagnosticos}</div>
          <div className="stats-label">Desde o início do sistema</div>
        </div>

        <div className="stats-card">
          <h3>Casos de Diabetes</h3>
          <div className="stats-value">{data.casosDiabetes}</div>
          <div className="stats-label">Confirmados pelo sistema</div>
        </div>

        <div className="stats-card">
          <h3>Média de Idade</h3>
          <div className="stats-value">{data.idadeavg}</div>
          <div className="stats-label">Dos pacientes diagnosticados</div>
        </div>

        <div className="stats-card">
          <h3>Taxa de Risco</h3>
          <div className="stats-value">{data.risco}%</div>
          <div className="stats-label">Casos de alto risco</div>
        </div>
      </div>
    </div>
  );
}
