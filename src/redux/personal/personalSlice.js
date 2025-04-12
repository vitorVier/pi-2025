import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalData: {
    age: "",
    gender: "",
    weight: "",
    height: "",
  },
  medicalHistoryData: {
    diabetes: "",
    hipertensao: "",
    cardiaco: ""
  },
  sintomasData: {
    gestacoes: "",
    triceps: "",
    insulina: "",
    observacoes: ""
  },
  lifeStyleData: {
    atividade: "",
    alimentacao: "",
    alcohol: "",
    smoke: ""
  }
};

const personalSlice = createSlice({
  name: "personal",
  initialState,
  reducers: {
    // Personal Data Reducers
    setAge: (state, action) => {
      state.personalData.age = action.payload;
      console.log(state.personalData.age)
    },
    setGender: (state, action) => {
      state.personalData.gender = action.payload;
      console.log(action.payload)
    },
    setWeight: (state, action) => {
      state.personalData.weight = action.payload;
      console.log(action.payload)
    },
    setHeight: (state, action) => {
      state.personalData.height = action.payload;
      console.log(action.payload)
    },

    // Medical History Data Reducers
    setDiabetes: (state, action) => {
      state.medicalHistoryData.diabetes = action.payload;
      console.log(action.payload)
    },
    setHipertensao: (state, action) => {
      state.medicalHistoryData.hipertensao = action.payload;
      console.log(action.payload)
    },
    setCardiaco: (state, action) => {
      state.medicalHistoryData.cardiaco = action.payload;
      console.log(action.payload)
    },

    // Sintomas Data Reducers
    setGlicose: (state, action) => {
      state.medicalHistoryData.diabetes = action.payload;
      console.log(action.payload)
    },
    setSymptomFrequency: (state, action) => {
      state.medicalHistoryData.hipertensao = action.payload;
      console.log(action.payload)
    },
    setSymptomDuration: (state, action) => {
      state.medicalHistoryData.cardiaco = action.payload;
      console.log(action.payload)
    },

    // Sintomas Data Reducers
    setAtividade: (state, action) => {
      state.lifeStyleData.diabetes = action.payload;
      console.log(action.payload)
    },
    setPadraoAlimentar: (state, action) => {
      state.lifeStyleData.hipertensao = action.payload;
      console.log(action.payload)
    },
    setSmoke: (state, action) => {
      state.lifeStyleData.hipertensao = action.payload;
      console.log(action.payload)
    },
    setAlcohol: (state, action) => {
      state.lifeStyleData.cardiaco = action.payload;
      console.log(action.payload)
    },

    // Aditional Info Reducers
    setGestacoes: (state, action) => {
      state.sintomasData.age = action.payload;
      console.log(state.sintomasData.age)
    },
    setTriceps: (state, action) => {
      state.sintomasData.gender = action.payload;
      console.log(action.payload)
    },
    setInsulina: (state, action) => {
      state.sintomasData.weight = action.payload;
      console.log(action.payload)
    },
    setObservacoes: (state, action) => {
      state.sintomasData.height = action.payload;
      console.log(action.payload)
    },
  },
});

export const { 
  setAge, setGender, setWeight, setHeight, 
  setDiabetes, setHipertensao, setCardiaco,
  setGlicose, setSymptomFrequency, setSymptomDuration,
  setAtividade, setPadraoAlimentar, setSmoke, setAlcohol,
  setGestacoes, setTriceps, setInsulina, setObservacoes
} = personalSlice.actions;
export default personalSlice.reducer;

// RETORNA GERAL
// console.log(`
//   Idade: ${state.personalData.age},
//   Genero: ${state.personalData.gender},
//   Peso: ${state.personalData.weight},
//   Altura: ${state.personalData.height},
//   Diabetico: ${state.medicalHistoryData.diabetes},
//   Hipertenso: ${state.medicalHistoryData.hipertensao},
//   Cardiaco: ${state.medicalHistoryData.cardiaco},
//   Glicose: ${setGlicose}, 
//   Sintomas Frequentes: ${setSymptomFrequency}, 
//   Duração dos Sintomas: ${setSymptomDuration},
//   Atividade: ${state.lifeStyleData.gestacoes},
//   Padrão Alimentar: ${state.lifeStyleData.gestacoes},
//   Fuma: ${state.lifeStyleData.gestacoes},
//   Alcoolatra: ${state.lifeStyleData.gestacoes},
//   Gestações: ${state.sintomasData.gestacoes},
//   Triceps: ${state.sintomasData.triceps},
//   Insulina: ${state.sintomasData.insulina},
//   Observações: ${state.sintomasData.observacoes}
// `)