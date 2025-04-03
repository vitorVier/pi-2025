import { useNavigate } from "react-router";
import "../../App.css";
import { useState } from "react";

export function Pessoal() {
  const navigate = useNavigate()

  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  function handleNextPage() {
    console.log(`Age: ${age}, Gender: ${gender}, Weight: ${weight}, Height: ${height}`);
    navigate('/historico')
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
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="gender">Sexo</label>
        <select id="gender" name="gender" value={gender} onChange={(e) => setGender(e.target.value)} required>
          <option value="">Selecione...</option>
          <option value="masculino">Masculino</option>
          <option value="feminino">Feminino</option>
          <option value="outro">Outro</option>
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
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
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
          value={height}
          onChange={(e) => setHeight(e.target.value)}
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
          onClick={handleNextPage}
        >
          Próximo
        </button>
      </div>
    </form>
  );
}
