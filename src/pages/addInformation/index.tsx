import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { setGestacoes, setTriceps, setInsulina, setObservacoes } from "../../redux/personal/personalSlice"; 

export function AddInformation() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // @ts-ignore
    const { gestacoes, triceps, insulina, observacoes } = useSelector((state) => state.pessoal);

    const [localGestacoes, setLocalGestacoes] = useState(gestacoes || '');
    const [localTriceps, setLocalTriceps] = useState(triceps || '');
    const [localInsulina, setLocalInsulina] = useState(insulina || '');
    const [localObservacoes, setLocalObservacoes] = useState(observacoes || '');

    function handleBackPage() {
        navigate('/lifeStyle');
    }

    function handleNextPage() {
        dispatch(setGestacoes(localGestacoes));
        dispatch(setTriceps(localTriceps));
        dispatch(setInsulina(localInsulina));
        dispatch(setObservacoes(localObservacoes));
        navigate('/results');
    }

    return (
        <div className="form-section" id="section5">
            <h2>Informações Adicionais</h2>

            <div className="form-group">
                <label htmlFor="pregnancies">Número de gestações (se aplicável)</label>
                <input
                    type="number"
                    id="pregnancies"
                    name="pregnancies"
                    min="0"
                    max="20"
                    value={localGestacoes}
                    onChange={(e) => setLocalGestacoes(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="skin_thickness">Espessura da pele do tríceps (mm)</label>
                <input
                    type="number"
                    id="skin_thickness"
                    name="skin_thickness"
                    min="10"
                    max="100"
                    value={localTriceps}
                    onChange={(e) => setLocalTriceps(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="insulin">Nível de insulina (μU/mL)</label>
                <input
                    type="number"
                    id="insulin"
                    name="insulin"
                    min="0"
                    max="1000"
                    value={localInsulina}
                    onChange={(e) => setLocalInsulina(e.target.value)}
                />
            </div>

            <div className="form-group">
                <label htmlFor="notes">Observações adicionais</label>
                <textarea
                    id="notes"
                    name="notes"
                    value={localObservacoes}
                    onChange={(e) => setLocalObservacoes(e.target.value)}
                ></textarea>
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
                    id="submitBtn"
                    className="btn btn-primary"
                    onClick={handleNextPage}
                >
                    Enviar e Analisar
                </button>
            </div>
        </div>
    );
}
