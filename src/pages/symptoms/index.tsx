import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { setGlicose, setSymptomFrequency, setSymptomDuration } from "../../redux/personal/personalSlice";

export function Symptoms() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // @ts-ignore
  const { glicose, sintomasFrequentes, symptomDuration } = useSelector((state) => state.pessoal);

  const [localGlicose, setLocalGlicose] = useState(glicose || "");
  const [localSintomas, setLocalSintomas] = useState<string[]>(sintomasFrequentes || []);
  const [localDuration, setLocalDuration] = useState(symptomDuration || "");

  function handleBackPage() {
    navigate("/medicalHistory");
  }

  function handleNextPage() {
    dispatch(setGlicose(localGlicose));
    dispatch(setSymptomFrequency(localSintomas));
    dispatch(setSymptomDuration(localDuration));
    navigate("/lifeStyle");
  }

  function handleCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, checked } = e.target;
    setLocalSintomas((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  }

  return (
    <form id="diabetesForm">
      <div className="form-section" id="section3">
        <h2>Sintomas Atuais</h2>

        <div className="form-group">
          <label htmlFor="glucose">Nível de glicose no sangue (mg/dL)</label>
          <input
            type="text"
            id="glucose"
            name="glucose"
            value={localGlicose}
            onChange={(e) => setLocalGlicose(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Sintomas frequentes (marque todos que se aplicam)</label>
          <div className="checkbox-group">
            {[
              "Sede Excessiva",
              "Micção frequente",
              "Fome excessiva",
              "Fadiga",
              "Visão turva",
              "Perda de peso inexplicada"
            ].map((symptom) => (
              <div className="checkbox-option" key={symptom}>
                <input
                  type="checkbox"
                  id={symptom}
                  name="symptoms"
                  value={symptom}
                  checked={localSintomas.includes(symptom)}
                  onChange={handleCheckbox}
                />
                <label htmlFor={symptom}>{symptom}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="symptom_duration">
            Há quanto tempo apresenta esses sintomas?
          </label>
          <select
            id="symptom_duration"
            name="symptom_duration"
            value={localDuration}
            onChange={(e) => setLocalDuration(e.target.value)}
            required
          >
            <option value="">Selecione...</option>
            <option value="dias">Dias</option>
            <option value="semanas">Semanas</option>
            <option value="meses">Meses</option>
            <option value="anos">Anos</option>
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
