import { useState } from "react";
import { useNavigate } from "react-router";

export function LifeStyle() {
  const navigate = useNavigate()

  const [atividade, setAtividade] = useState("");
  const [padraoAlimentar, setPadraoAlimentar] = useState("");
  const [smoke, setSmoke] = useState("");
  const [alcohol, setAlocohol] = useState("");

  function handleBackPage() {
    navigate('/sintomas')
  }
  function handleNextPage() {
    console.log(`Atividade Física: ${atividade}, Padrão Alimentar: ${padraoAlimentar}, Fumante: ${smoke}, Alcolatra: ${alcohol}`);
    navigate('/addInformation')
  }

  return (
    <form id="diabetesForm">
      <div className="form-section" id="section4">
        <h2>Estilo de Vida</h2>

        <div className="form-group">
          <label htmlFor="activity_level">Nível de atividade física</label>
          <select id="activity_level" name="activity_level" value={atividade} onChange={(e) => setAtividade(e.target.value)} required>
            <option value="">Selecione...</option>
            <option value="sedentário">
              Sedentário (pouco ou nenhum exercício)
            </option>
            <option value="leve">
              Leve (exercício leve 1-3 dias/semana)
            </option>
            <option value="moderado">
              Moderado (exercício moderado 3-5 dias/semana)
            </option>
            <option value="ativo">
              Ativo (exercício intenso 6-7 dias/semana)
            </option>
            <option value="muito ativo">
              Muito ativo (exercício intenso diariamente ou trabalho físico)
            </option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="diet">Padrão alimentar</label>
          <select id="diet" name="diet" value={padraoAlimentar} onChange={(e) => setPadraoAlimentar(e.target.value)} required>
            <option value="">Selecione...</option>
            <option value="balanceado">Balanceada</option>
            <option value="rico em carboidratos">Rica em carboidratos</option>
            <option value="rico em gorduras">Rica em gorduras</option>
            <option value="rico em proteinas">Rica em proteínas</option>
            <option value="processados">Muitos alimentos processados</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="smoking">Fuma atualmente?</label>
          <select id="smoking" name="smoking" value={smoke} onChange={(e) => setSmoke(e.target.value)} required>
            <option value="">Selecione...</option>
            <option value="nunca">Nunca fumei</option>
            <option value="ex-fumante">Ex-fumante</option>
            <option value="fumante">Fumante atual</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="alcohol">Consumo de álcool</label>
          <select id="alcohol" name="alcohol" value={alcohol} onChange={(e) => setAlocohol(e.target.value)} required>
            <option value="">Selecione...</option>
            <option value="nunca">Nunca</option>
            <option value="casualmente">Ocasionalmente</option>
            <option value="moderado">Moderadamente</option>
            <option value="frequente">Frequentemente</option>
          </select>
        </div>

        <div className="navigation">
          <button
            type="button"
            className="btn btn-outline prev-btn"
            data-prev="section3"
            onClick={handleBackPage}
          >
            Anterior
          </button>
          <button
            type="button"
            className="btn btn-primary next-btn"
            data-next="section5"
            onClick={handleNextPage}
          >
            Próximo
          </button>
        </div>
      </div>
    </form>
  )
}
