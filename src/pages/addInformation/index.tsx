import { useState } from "react";
import { useNavigate } from "react-router"

export function AddInformation() {
    const navigate = useNavigate();

    const [gestacoes, setGestacoes] = useState('');
    const [triceps, setTriceps] = useState('');
    const [insulina, setInsulina] = useState('');
    const [observacoes, setObservacoes] = useState('');

    function handleBackPage() {
        navigate('/lifeStyle')
    }
    function handleNextPage() {
        console.log(`Número de Gestações: ${gestacoes}, Triceps: ${triceps}, Insulina: ${insulina}, Obs.: ${observacoes}`);
        navigate('/results')
    }

    return (
        <div className="form-section" id="section5">
            <h2>Informações Adicionais</h2>

            <div className="form-group">
                <label htmlFor="pregnancies">Número de gestações (se aplicável)</label>
                <input type="number" id="pregnancies" name="pregnancies" min="0" max="20" value={gestacoes} onChange={(e) => setGestacoes(e.target.value)}/>
            </div>

            <div className="form-group">
                <label htmlFor="skin_thickness">Espessura da pele do tríceps (mm)</label>
                <input type="number" id="skin_thickness" name="skin_thickness" min="10" max="100" value={triceps} onChange={(e) => setTriceps(e.target.value)}/>
            </div>

            <div className="form-group">
                <label htmlFor="insulin">Nível de insulina (μU/mL)</label>
                <input type="number" id="insulin" name="insulin" min="0" max="1000" value={insulina} onChange={(e) => setInsulina(e.target.value)}/>
            </div>

            <div className="form-group">
                <label htmlFor="notes">Observações adicionais</label>
                <textarea id="notes" name="notes" value={observacoes} onChange={(e) => setObservacoes(e.target.value)}></textarea>
            </div>

            <div className="navigation">
                <button type="button" className="btn btn-outline prev-btn" data-prev="section4" onClick={handleBackPage}>Anterior</button>
                <button type="button" id="submitBtn" className="btn btn-primary" onClick={handleNextPage}>Enviar e Analisar</button>
            </div>
        </div>
    )
}