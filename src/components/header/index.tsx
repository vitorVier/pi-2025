import '../../App.css'

export function Header() {
    return(
        <div className="container">
            <div className="header">
                <h1>Sistema de Diagnóstico de Diabetes</h1>
                <p>Anamnese inteligente e relatórios estatísticos</p>
            </div>

            <div className="tabs">
                <div className="tab active" data-tab="form">
                    Formulário
                </div>
                <div className="tab" data-tab="results">
                    Resultados
                </div>
                <div className="tab" data-tab="reports">
                    Relatórios
                </div>
            </div>

            {/* <!-- Conteúdo da aba Formulário --> */}
            <div className="tab-content active" id="form-tab">
                <div className="progress-bar">
                    <div className="progress" id="progress"></div>
                </div>
            </div>
        </div>
    )
}