import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import FormDataReducer from "./FormDataReducer";

export default combineReducers({
  auth: AuthReducer,
  stream: FormDataReducer,
});
