import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

// @ts-ignore
import { setAge, setGender, setWeight, setHeight } from "../../redux/personal/personalSlice";
import { useState } from "react";

import "../../App.css";

export function Personal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // @ts-ignore Valores locais (não no Redux) 
  const { age, gender, weight, height } = useSelector((state) => state.pessoal);

  // Controle local (os valores que serão passados para Redux no final)
  const [localAge, setLocalAge] = useState('');
  const [localGender, setLocalGender] = useState('');
  const [localWeight, setLocalWeight] = useState('');
  const [localHeight, setLocalHeight] = useState('');

  function handleNextPage() {
    // Agora, no clique do botão, atualizamos o Redux
    dispatch(setAge(localAge));
    dispatch(setGender(localGender));
    dispatch(setWeight(localWeight));
    dispatch(setHeight(localHeight));

    navigate("/medicalHistory");
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
            value={localAge}
            onChange={(e) => setLocalAge(e.target.value)}  // Atualiza o valor local
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="gender">Sexo</label>
        <select
          id="gender"
          name="gender"
          value={localGender}
          onChange={(e) => setLocalGender(e.target.value)}  // Atualiza o valor local
          required
        >
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
          value={localWeight}
          onChange={(e) => setLocalWeight(e.target.value)}  // Atualiza o valor local
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
          value={localHeight}
          onChange={(e) => setLocalHeight(e.target.value)}  // Atualiza o valor local
          required
        />
      </div>

      <div className="navigation">
        <button type="button" className="btn btn-outline" id="pessoalBackBtn" disabled>
          Anterior
        </button>
        <button
          type="button"
          className="btn btn-primary next-btn"
          onClick={handleNextPage}  // Atualiza Redux quando clica em "Próximo"
        >
          Próximo
        </button>
      </div>
    </form>
  );
}
