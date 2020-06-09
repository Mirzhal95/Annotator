import editReducer from "./editReducer";
import fileReducer from "./fileReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  editReducer,
  fileReducer,
});

export default rootReducer;
