import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { App } from "./Pages/App";

export const Routing = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="*" to="/" component={() => <App />} />
        </Switch>
      </Router>
    </>
  );
};
