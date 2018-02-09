import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from "redux-form";
import toolreducer from "./toolreducer";
import storyreducer from "./storyreducer";
import mapreducer from "./mapreducer";
import errorreducer from "./errorreducer";

import testreducer from "./testreducer";

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  // your reducer here
  tool: toolreducer,
  story: storyreducer,
  map: mapreducer,
  error: errorreducer,
  test: testreducer
});
