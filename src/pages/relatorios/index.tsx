export function Relatorios() {
    return (
        <div className="tab-content" id="reports-tab">
            <h2>Relatórios Estatísticos</h2>

            <div className="report-grid">
                <div className="stats-card">
                    <h3>Total de Diagnósticos</h3>
                    <div className="stats-value" id="total-diagnoses">0</div>
                    <div className="stats-label">Desde o início do sistema</div>
                </div>

                <div className="stats-card">
                    <h3>Casos de Diabetes</h3>
                    <div className="stats-value" id="diabetes-cases">0</div>
                    <div className="stats-label">Confirmados pelo sistema</div>
                </div>

                <div className="stats-card">
                    <h3>Média de Idade</h3>
                    <div className="stats-value" id="average-age">0</div>
                    <div className="stats-label">Dos pacientes diagnosticados</div>
                </div>

                <div className="stats-card">
                    <h3>Taxa de Risco</h3>
                    <div className="stats-value" id="high-risk-rate">0%</div>
                    <div className="stats-label">Casos de alto risco</div>
                </div>
            </div>

            <div className="chart-container">
                <h3>Distribuição por Tipo de Diabetes</h3>
                <canvas id="diabetesDistributionChart"></canvas>
            </div>

            <div className="chart-container">
                <h3>Fatores de Risco Mais Comuns</h3>
                <canvas id="riskFactorsChart"></canvas>
            </div>

            <div className="chart-container">
                <h3>Evolução Mensal de Casos</h3>
                <canvas id="monthlyTrendChart"></canvas>
            </div>
        </div>
    )
}
