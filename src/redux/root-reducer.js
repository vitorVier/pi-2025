import { combineReducers } from "@reduxjs/toolkit";
import personalReducer from "./personal/personalSlice";

const rootReducer = combineReducers({
  pessoal: personalReducer,
  // outros reducers aqui, ex: auth: authReducer
});

export default rootReducer;
