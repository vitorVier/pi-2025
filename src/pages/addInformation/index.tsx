import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { setGestacoes, setTriceps, setInsulina, setObservacoes, setDiagnosisResult } from "../../redux/personal/personalSlice"; 

export function AddInformation() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // @ts-ignore
    const { 
        personalData,
        medicalHistoryData,
        sintomasData,
        lifeStyleData,
        addInfoData,
        gestacoes, 
        triceps, 
        insulina, 
        observacoes 
        // @ts-ignore
    } = useSelector((state) => state.pessoal);

    const [localGestacoes, setLocalGestacoes] = useState(gestacoes || '');
    const [localTriceps, setLocalTriceps] = useState(triceps || '');
    const [localInsulina, setLocalInsulina] = useState(insulina || '');
    const [localObservacoes, setLocalObservacoes] = useState(observacoes || '');

    function handleBackPage() {
        navigate('/lifeStyle');
    }

    function handleNextPage() {
        const sanitizeNumber = (value: any, fallback = 0) => {
            const num = Number(value);
            return isNaN(num) ? fallback : num;
        };

        const payload = {
            age: sanitizeNumber(personalData.age),
            gender: personalData.gender?.toLowerCase() || "desconhecido",
            weight: sanitizeNumber(personalData.weight),
            height: sanitizeNumber(personalData.height),

            diabetes: medicalHistoryData.diabetes?.toLowerCase() || "não",
            hipertensao: medicalHistoryData.hipertensao?.toLowerCase() || "não",
            cardiaco: medicalHistoryData.cardiaco?.toLowerCase() || "não",

            glicose: sanitizeNumber(sintomasData.glicose),
            symptomFrequency: Array.isArray(sintomasData.symptomFrequency)
            ? sintomasData.symptomFrequency.map((s: string) => s.toLowerCase())
            : sintomasData.symptomFrequency?.toLowerCase() || "desconhecido",
            symptomDuration: sintomasData.symptomDuration?.toLowerCase() || "dias",

            atividade: lifeStyleData.atividade?.toLowerCase() || "leve",
            alimentacao: lifeStyleData.alimentacao?.toLowerCase() || "normal",
            alcohol: lifeStyleData.alcohol?.toLowerCase() || "nunca",
            smoke: lifeStyleData.smoke?.toLowerCase() || "nunca",

            gestacoes: sanitizeNumber(addInfoData.gestacoes),
            triceps: sanitizeNumber(addInfoData.triceps),
            insulina: sanitizeNumber(addInfoData.insulina),
            obs: addInfoData.obs || ""
        };

        fetch("http://localhost:5000/diagnosticar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.diagnostico) {
                dispatch(setDiagnosisResult({
                    diagnostico: data.diagnostico,
                    confianca: data.confianca_percentual
                }));
                navigate("/results");
            } else {
                alert("Erro ao diagnosticar: " + data.error);
            }
        })
        .catch((err) => {
            console.error(err);
            alert("Erro ao conectar com o servidor");
        });
    }

    return (
        <div className="form-section" id="section5">
            <h2>Informações Adicionais</h2>

            <div className="form-group">
                <label htmlFor="pregnancies">Número de gestações (se aplicável)</label>
                <input
                    type="text"
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
