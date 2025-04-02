export function LifeStyle() {
    return (
        <div className="form-section" id="section4">
            <h2>Estilo de Vida</h2>

            <div className="form-group">
              <label htmlFor="activity_level">Nível de atividade física</label>
              <select id="activity_level" name="activity_level" required>
                <option value="">Selecione...</option>
                <option value="sedentary">
                  Sedentário (pouco ou nenhum exercício)
                </option>
                <option value="light">
                  Leve (exercício leve 1-3 dias/semana)
                </option>
                <option value="moderate">
                  Moderado (exercício moderado 3-5 dias/semana)
                </option>
                <option value="active">
                  Ativo (exercício intenso 6-7 dias/semana)
                </option>
                <option value="very_active">
                  Muito ativo (exercício intenso diariamente ou trabalho físico)
                </option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="diet">Padrão alimentar</label>
              <select id="diet" name="diet" required>
                <option value="">Selecione...</option>
                <option value="balanced">Balanceada</option>
                <option value="high_carb">Rica em carboidratos</option>
                <option value="high_fat">Rica em gorduras</option>
                <option value="high_protein">Rica em proteínas</option>
                <option value="processed">Muitos alimentos processados</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="smoking">Fuma atualmente?</label>
              <select id="smoking" name="smoking" required>
                <option value="">Selecione...</option>
                <option value="never">Nunca fumei</option>
                <option value="former">Ex-fumante</option>
                <option value="current">Fumante atual</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="alcohol">Consumo de álcool</label>
              <select id="alcohol" name="alcohol" required>
                <option value="">Selecione...</option>
                <option value="never">Nunca</option>
                <option value="occasionally">Ocasionalmente</option>
                <option value="moderately">Moderadamente</option>
                <option value="heavily">Frequentemente</option>
              </select>
            </div>

            <div className="navigation">
              <button
                type="button"
                className="btn btn-outline prev-btn"
                data-prev="section3"
              >
                Anterior
              </button>
              <button
                type="button"
                className="btn btn-primary next-btn"
                data-next="section5"
              >
                Próximo
              </button>
            </div>
          </div>
    )
}
