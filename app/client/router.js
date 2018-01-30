import React from "react";
import { ConnectedRouter } from "react-router-redux";
import { Route, IndexRoute } from "react-router";
import { history } from "./store.js";
import App from "./components/App";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

// build the router
const router = (
  <ConnectedRouter history={history}>
    <App>
      <Route exact path="/" component={Home}/>
    </App>
  </ConnectedRouter>
);

// export
export { router };
