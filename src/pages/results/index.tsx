import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export function Results() {
    // @ts-ignore
    const personalData = useSelector((state) => state.pessoal.personalData);
    // @ts-ignore
    const medicalHistoryData = useSelector((state) => state.pessoal.medicalHistoryData);
    // @ts-ignore
    const sintomasData = useSelector((state) => state.pessoal.sintomasData);
    // @ts-ignore
    const lifeStyleData = useSelector((state) => state.pessoal.lifeStyleData);
    // @ts-ignore
    const addInfoData = useSelector((state) => state.pessoal.addInfoData);

    const [diagnostico, setDiagnostico] = useState('');
    const [confianca, setConfianca] = useState(null);

    useEffect(() => {
        const enviarDadosParaAPI = async () => {
            const payload = {
                ...personalData,
                ...medicalHistoryData,
                ...sintomasData,
                ...lifeStyleData,
                ...addInfoData
            };

            try {
                const response = await fetch('http://localhost:5000/diagnosticar', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                const resultado = await response.json();
                if (response.ok) {
                    setDiagnostico(resultado.diagnostico);
                    setConfianca(resultado.confianca_percentual);
                } else {
                    console.error('Erro ao diagnosticar:', resultado.error);
                }
            } catch (error) {
                console.error('Erro de rede:', error);
            }
        };

        enviarDadosParaAPI();
    }, []); // Só envia uma vez ao montar a página

    const nivelRisco = confianca !== null
        ? confianca >= 70 ? 'Alto'
        : confianca >= 40 ? 'Médio'
        : 'Baixo'
        : '';

    return (
        <div className="tab-content" id="results-tab">
            {/* <h2>Histórico de Diagnósticos</h2>

            <div className="filters"> {/* Filtros (por enquanto visuais) </div>

            <div className="chart-container">
                <canvas id="diagnosisTrendChart"></canvas>
            </div> */}

            <table className="data-table">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Sexo</th>
                        <th>Idade</th>
                        <th>Tipo</th>
                        <th>Probabilidade</th>
                        <th>Nível de Risco</th>
                    </tr>
                </thead>
                <tbody id="results-table">
                    <tr>
                        <td>{new Date().toLocaleDateString()}</td>
                        <td>{personalData.gender}</td>
                        <td>{personalData.age}</td>
                        <td>{diagnostico || '...aguardando'}</td>
                        <td>{confianca !== null ? `${confianca}%` : '...aguardando'}</td>
                        <td>{nivelRisco}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
