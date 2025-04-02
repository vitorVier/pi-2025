import { useState } from "react";

export function Sintomas() {
  const [glicose, setGlicose] = useState("");
  // const [sintomasFrequentes, setSintomasFrequentes] = useState([]);
  const [symptomDuration, setSymptomDuration] = useState("");

  return (
    <form id="diabetesForm">
      <div className="form-section" id="section3">
        <h2>Sintomas Atuais</h2>

        <div className="form-group">
          <label htmlFor="glucose">Nível de glicose no sangue (mg/dL)</label>
          <input
            type="number"
            id="glucose"
            name="glucose"
            min="50"
            max="500"
            value={glicose} 
            onChange={(e) => setGlicose(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Sintomas frequentes (marque todos que se aplicam)</label>
          <div className="checkbox-group">
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="symptom_thirst"
                name="symptoms"
                // value={sintomasFrequentes} 
                onChange={(e) => setGlicose(e.target.value)}
              />
              <label htmlFor="symptom_thirst">Sede excessiva</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="symptom_urination"
                name="symptoms"
                value="urination"
              />
              <label htmlFor="symptom_urination">Micção frequente</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="symptom_hunger"
                name="symptoms"
                value="hunger"
              />
              <label htmlFor="symptom_hunger">Fome excessiva</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="symptom_fatigue"
                name="symptoms"
                value="fatigue"
              />
              <label htmlFor="symptom_fatigue">Fadiga</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="symptom_blurred"
                name="symptoms"
                value="blurred"
              />
              <label htmlFor="symptom_blurred">Visão turva</label>
            </div>
            <div className="checkbox-option">
              <input
                type="checkbox"
                id="symptom_weight"
                name="symptoms"
                value="weight"
              />
              <label htmlFor="symptom_weight">Perda de peso inexplicada</label>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="symptom_duration">
            Há quanto tempo apresenta esses sintomas?
          </label>
          <select id="symptom_duration" name="symptom_duration" value={symptomDuration} onChange={(e) => setSymptomDuration(e.target.value)} required>
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
            data-prev="section2"
          >
            Anterior
          </button>
          <button
            type="button"
            className="btn btn-primary next-btn"
            data-next="section4"
          >
            Próximo
          </button>
        </div>
      </div>
    </form>
  )
}
