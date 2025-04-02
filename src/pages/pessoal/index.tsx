import "../../App.css";
import { useState } from "react";

export function Pessoal() {
  const [idade, setIdade] = useState("");
  // const [sexo, setSexo] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");

  function handleNext() {
    console.log(idade, peso, altura);
  }

  return (
    <form id="diabetesForm">
      <div className="form-section active" id="section1">
        <h2>Dados Pessoais</h2>

        <div className="form-group">
          <label htmlFor="age">Idade</label>
          <input
            type="number"
            id="age"
            name="age"
            min="1"
            max="120"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="gender">Sexo</label>
        <select id="gender" name="gender" required>
          <option value="">Selecione...</option>
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
          <option value="other">Outro</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="weight">Peso (kg)</label>
        <input
          type="number"
          id="weight"
          name="weight"
          step="0.1"
          min="20"
          max="300"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="height">Altura (cm)</label>
        <input
          type="number"
          id="height"
          name="height"
          min="100"
          max="250"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          required
        />
      </div>

      <div className="navigation">
        <button type="button" className="btn btn-outline" disabled>
          Anterior
        </button>
        <button
          type="button"
          className="btn btn-primary next-btn"
          data-next="section2"
          onClick={handleNext}
        >
          Próximo
        </button>
      </div>
    </form>
  );
}
