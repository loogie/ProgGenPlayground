import React from "react";
import { ConnectedRouter } from "react-router-redux";
import { Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import App from "./components/App";
import Home from "./components/Home";
import Story from "./components/Story";
import NotFound from "./components/NotFound";

import Test from "./components/Test";

// build the router
const router = (
  <ConnectedRouter history={history}>
    <App>
      <Route exact path="/" component={Test}/>
      <Route exact path="/map" component={Home}/>
      <Route exact path="/story" component={Story}/>
    </App>
  </ConnectedRouter>
);

// export
export { router };
