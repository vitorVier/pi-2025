import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  personalData: {
    age: "",
    gender: "",
    weight: "",
    height: "",
  }
};

const personalSlice = createSlice({
  name: "personal",
  initialState,
  reducers: {
    setAge: (state, action) => {
      state.personalData.age = action.payload;
      // console.log(age)
    },
    setGender: (state, action) => {
      state.personalData.gender = action.payload;
      // console.log(age)
    },
    setWeight: (state, action) => {
      state.personalData.weight = action.payload;
      // console.log(age)
    },
    setHeight: (state, action) => {
      state.personalData.height = action.payload;
      // console.log(age)
    },
  },
});

export const { setAge, setGender, setWeight, setHeight } = personalSlice.actions;
export default personalSlice.reducer;
