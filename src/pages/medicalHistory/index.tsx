import '../../App.css'

export function MedicalHistory() {
    return (
        <div className="form-section" id="section2">
            <h2>Histórico Médico</h2>

            <div className="form-group">
              <label>Histórico familiar de diabetes?</label>
              <div className="radio-group">
                <div className="radio-option">
                    <input
                        type="radio"
                        id="family_history_yes"
                        name="family_history"
                        value="yes"
                        required
                    />
                    <label htmlFor="family_history_yes">Sim</label>
                </div>
                    
                <div className="radio-option">
                    <input
                        type="radio"
                        id="family_history_no"
                        name="family_history"
                        value="no"
                    />
                    <label htmlFor="family_history_no">Não</label>
                    </div>
                </div>
            </div>

            <div className="form-group">
                <label htmlFor="hypertension">Possui hipertensão?</label>
                <select id="hypertension" name="hypertension" required>
                    <option value="">Selecione...</option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="heart_disease">Possui doenças cardíacas?</label>
                <select id="heart_disease" name="heart_disease" required>
                    <option value="">Selecione...</option>
                    <option value="1">Sim</option>
                    <option value="0">Não</option>
                </select>
            </div>

            <div className="navigation">
                <button
                    type="button"
                    className="btn btn-outline prev-btn"
                    data-prev="section1"
                >
                    Anterior
                </button>
                <button
                    type="button"
                    className="btn btn-primary next-btn"
                    data-next="section3"
                >
                    Próximo
                </button>
            </div>
        </div>
    )
}