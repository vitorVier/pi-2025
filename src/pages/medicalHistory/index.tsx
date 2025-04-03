import { useState } from 'react';
import { useNavigate } from 'react-router';
import '../../App.css'

export function MedicalHistory() {
    const navigate = useNavigate();

    const [diabetes, setDiabetes] = useState("");
    const [hipertensao, setHipertensao] = useState("");
    const [cardiaco, setCardiaco] = useState("");

    function handleBackPage() {
        navigate('/')
    }
    function handleNextPage() {
        console.log(`Diabético: ${diabetes}, Hipertenso: ${hipertensao}, Cardiaco: ${cardiaco}`);
        navigate('/sintomas')
    }

    return (
        <form id="diabetesForm">
            <div className="form-section" id="section2">
                <h2>Histórico Médico</h2>

                <div className="form-group">
                    <label htmlFor='family_history'>Histórico familiar de diabetes?</label>
                    <div className="radio-group">
                        <div className="radio-option">
                            <input
                                type="radio"
                                id="family_history_yes"
                                name="family_history"
                                value="sim"
                                checked={diabetes === 'sim'}
                                onChange={(e) => setDiabetes(e.target.value)}
                                required
                            />
                            <label htmlFor="family_history_yes">Sim</label>
                        </div>

                        <div className="radio-option">
                            <input
                                type="radio"
                                id="family_history_no"
                                name="family_history"
                                value="não"
                                checked={diabetes === 'não'}
                                onChange={(e) => setDiabetes(e.target.value)}
                            />
                            <label htmlFor="family_history_no">Não</label>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="hypertension">Possui hipertensão?</label>
                    <select id="hypertension" name="hypertension" value={hipertensao} onChange={(e) => setHipertensao(e.target.value)} required>
                        <option value="">Selecione...</option>
                        <option value="sim">Sim</option>
                        <option value="não">Não</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="heart_disease">Possui doenças cardíacas?</label>
                    <select id="heart_disease" name="heart_disease" value={cardiaco} onChange={(e) => setCardiaco(e.target.value)} required>
                        <option value="">Selecione...</option>
                        <option value="sim">Sim</option>
                        <option value="não">Não</option>
                    </select>
                </div>

                <div className="navigation">
                    <button
                        type="button"
                        className="btn btn-outline prev-btn"
                        data-prev="section1"
                        onClick={handleBackPage}
                    >
                        Anterior
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary next-btn"
                        data-next="section3"
                        onClick={handleNextPage}
                    >
                        Próximo
                    </button>
                </div>
            </div>
        </form>
    )
}