import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
// @ts-ignore
import { setDiabetes, setHipertensao, setCardiaco } from "../../redux/personal/personalSlice";
import { useState } from "react";

import "../../App.css";

export function MedicalHistory() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // @ts-ignore Pegando os valores de histórico médico diretamente do Redux
    const { diabetes, hipertensao, cardiaco } = useSelector((state) => state.pessoal);

    const [localDiabetes, setLocalDiabetes] = useState('');
    const [localHipertensao, setLocalHipertensao] = useState('');
    const [localCardiaco, setLocalCardiaco] = useState('');

    // Funções de navegação
    function handleBackPage() {
        navigate('/');
    }

    function handleNextPage() {
        dispatch(setDiabetes(localDiabetes))
        dispatch(setHipertensao(localHipertensao))
        dispatch(setCardiaco(localCardiaco))
        navigate('/sintomas');
    }

    return (
        <form id="diabetesForm">
            <div className="form-section" id="section2">
                <h2>Histórico Médico</h2>

                <div className="form-group">
                    <label htmlFor="family_history">Histórico familiar de diabetes?</label>
                    <div className="radio-group">
                        <div className="radio-option">
                            <label htmlFor="family_history_yes">
                                <input
                                    type="radio"
                                    id="family_history_yes"
                                    name="family_history"
                                    value="sim"
                                    checked={localDiabetes === 'sim'}
                                    onChange={(e) => setLocalDiabetes(e.target.value)}
                                    required
                                />
                                Sim
                            </label>
                        </div>

                        <div className="radio-option">
                            <label htmlFor="family_history_no">
                                <input
                                    type="radio"
                                    id="family_history_no"
                                    name="family_history"
                                    value="não"
                                    checked={localDiabetes === 'não'}
                                    onChange={(e) => setLocalDiabetes(e.target.value)} 
                                />
                                Não
                            </label>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="hypertension">Possui hipertensão?</label>
                    <select
                        id="hypertension"
                        name="hypertension"
                        value={localHipertensao}
                        onChange={(e) => setLocalHipertensao(e.target.value)} 
                        required
                    >
                        <option value="">Selecione...</option>
                        <option value="sim">Sim</option>
                        <option value="não">Não</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="heart_disease">Possui doenças cardíacas?</label>
                    <select
                        id="heart_disease"
                        name="heart_disease"
                        value={localCardiaco}
                        onChange={(e) => setLocalCardiaco(e.target.value)} 
                        required
                    >
                        <option value="">Selecione...</option>
                        <option value="sim">Sim</option>
                        <option value="não">Não</option>
                    </select>
                </div>

                <div className="navigation">
                    <button
                        type="button"
                        className="btn btn-outline prev-btn"
                        onClick={handleBackPage}
                    >
                        Anterior
                    </button>
                    <button
                        type="button"
                        className="btn btn-primary next-btn"
                        onClick={handleNextPage}
                    >
                        Próximo
                    </button>
                </div>
            </div>
        </form>
    );
}
