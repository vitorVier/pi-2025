import { combineReducers } from "@reduxjs/toolkit";
import personalReducer from "./personal/personalSlice";

const rootReducer = combineReducers({
  pessoal: personalReducer,
});

export default rootReducer;
