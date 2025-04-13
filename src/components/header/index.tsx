import { Link, useLocation } from 'react-router-dom'
import '../../App.css'

export function Header() {
    const location = useLocation();

    // @ts-ignore
    const isActive = (path) => location.pathname.startsWith(path);

    return (
        <div className="container">
            <div className="header">
                <h1>Sistema de Diagnóstico de Diabetes</h1>
                <p>Anamnese inteligente e relatórios estatísticos</p>
            </div>

            <div className="tabs">
                <Link to='/'>
                <div className={`tab ${['/', '/medicalHistory', '/sintomas', '/lifeStyle', '/addInformation'].includes(location.pathname) ? 'active' : ''}`} data-tab="form">
                    Formulário
                </div>
                </Link>

                <Link to='/results'>
                    <div className={`tab ${isActive('/results') ? 'active' : ''}`} data-tab="results">
                        Resultados
                    </div>
                </Link>

                <Link to='/reports'>
                    <div className={`tab ${isActive('/reports') ? 'active' : ''}`} data-tab="reports">
                        Relatórios
                    </div>
                </Link>
            </div>
        </div>
    )
}
