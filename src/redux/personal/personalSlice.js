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
  },
});

export const { 
  setAge, setGender, setWeight, setHeight, 
  setDiabetes, setHipertensao, setCardiaco
} = personalSlice.actions;
export default personalSlice.reducer;
