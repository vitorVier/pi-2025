import { Link } from 'react-router'
import '../../App.css'

export function Header() {
    return (
        <div className="container">
            <div className="header">
                <h1>Sistema de Diagnóstico de Diabetes</h1>
                <p>Anamnese inteligente e relatórios estatísticos</p>
            </div>

            <div className="tabs">
                <Link to='/'>
                    <div className="tab active" data-tab="form">
                        Formulário
                    </div>
                </Link>

                <Link to='/results'>
                    <div className="tab" data-tab="results">
                        Resultados
                    </div>
                </Link>

                <Link to='/relatorios'>
                    <div className="tab" data-tab="reports">
                        Relatórios
                    </div>
                </Link>
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