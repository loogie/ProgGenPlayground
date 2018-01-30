import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import toolreducer from "./toolreducer";
import mapreducer from "./mapreducer";
import errorreducer from "./errorreducer";

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  // your reducer here
  tool: toolreducer,
  map: mapreducer,
  error: errorreducer
});
