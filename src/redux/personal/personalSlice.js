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
    glicose: "",
    symptomFrequency: "",
    symptomDuration: "",
  },
  lifeStyleData: {
    atividade: "",
    alimentacao: "",
    alcohol: "",
    smoke: ""
  },
  addInfoData: {
    gestacoes: "",
    triceps: "",
    insulina: "",
    obs: ""
  },
  diagnosisResult: {
    diagnostico: "",
    confianca: null,
  },
  diagnosisHistory: []
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
      state.sintomasData.glicose = action.payload;
      console.log(action.payload)
    },
    setSymptomFrequency: (state, action) => {
      state.sintomasData.symptomFrequency = action.payload;
      console.log(action.payload)
    },
    setSymptomDuration: (state, action) => {
      state.sintomasData.symptomDuration = action.payload;
      console.log(action.payload)
    },

    // Life Style Data Reducers
    setAtividade: (state, action) => {
      state.lifeStyleData.atividade = action.payload;
      console.log(action.payload)
    },
    setPadraoAlimentar: (state, action) => {
      state.lifeStyleData.alimentacao = action.payload;
      console.log(action.payload)
    },
    setSmoke: (state, action) => {
      state.lifeStyleData.smoke = action.payload;
      console.log(action.payload)
    },
    setAlcohol: (state, action) => {
      state.lifeStyleData.alcohol = action.payload;
      console.log(action.payload)
    },

    // Aditional Info Reducers
    setGestacoes: (state, action) => {
      state.sintomasData.gestacoes = action.payload;
      console.log(state.sintomasData.age)
    },
    setTriceps: (state, action) => {
      state.sintomasData.triceps = action.payload;
      console.log(action.payload)
    },
    setInsulina: (state, action) => {
      state.sintomasData.insulina = action.payload;
      console.log(action.payload)
    },
    setObservacoes: (state, action) => {
      state.sintomasData.obs = action.payload;
      console.log(action.payload)
    },

    // Diagnostico
    setDiagnosisResult: (state, action) => {
      state.diagnosisResult = action.payload;
    },
    addDiagnosisToHistory: (state, action) => {
      state.diagnosisHistory.push(action.payload);
    }
  },
});

export const { 
  setAge, setGender, setWeight, setHeight, 
  setDiabetes, setHipertensao, setCardiaco,
  setGlicose, setSymptomFrequency, setSymptomDuration,
  setAtividade, setPadraoAlimentar, setSmoke, setAlcohol,
  setGestacoes, setTriceps, setInsulina, setObservacoes,
  setDiagnosisResult, addDiagnosisToHistory
} = personalSlice.actions;
export default personalSlice.reducer;
