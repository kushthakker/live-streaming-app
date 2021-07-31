import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import FormDataReducer from "./FormDataReducer";
import StreamsReducer from "./StreamsReducer";

export default combineReducers({
  auth: AuthReducer,
  stream: FormDataReducer,
  streams: StreamsReducer,
});
