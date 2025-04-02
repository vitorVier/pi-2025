export function Results() {
    return (
        <div className="tab-content" id="results-tab">
            <h2>Histórico de Diagnósticos</h2>
            <div className="filters">
                <div className="filter-group">
                    <label htmlFor="date-filter">Período</label>
                    <select id="date-filter" className="form-control">
                        <option value="7">Últimos 7 dias</option>
                        <option value="30">Últimos 30 dias</option>
                        <option value="90">Últimos 3 meses</option>
                        <option value="365">Último ano</option>
                        <option value="all">Todos</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="type-filter">Tipo de Diabetes</label>
                    <select id="type-filter" className="form-control">
                        <option value="all">Todos</option>
                        <option value="0">Sem diabetes</option>
                        <option value="1">Tipo 1</option>
                        <option value="2">Tipo 2</option>
                        <option value="3">Gestacional</option>
                        <option value="4">Pré-diabetes</option>
                    </select>
                </div>
                <div className="filter-group">
                    <label htmlFor="risk-filter">Nível de Risco</label>
                    <select id="risk-filter" className="form-control">
                        <option value="all">Todos</option>
                        <option value="high">Alto (70%+)</option>
                        <option value="medium">Médio (40-70%)</option>
                        <option value="low">Baixo (0-40%)</option>
                    </select>
                </div>
            </div>
            
            <div className="chart-container">
                <canvas id="diagnosisTrendChart"></canvas>
            </div>
            
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Paciente</th>
                        <th>Idade</th>
                        <th>Tipo</th>
                        <th>Probabilidade</th>
                        <th>Nível de Risco</th>
                    </tr>
                </thead>
                <tbody id="results-table">
                    {/* <!-- Dados serão preenchidos via JavaScript --> */}
                </tbody>
            </table>
        </div>
    )
}