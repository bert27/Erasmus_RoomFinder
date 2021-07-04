import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,

} from "react-router-dom";
import { Page1 } from "./Pages/Page1";

export const Routing = (props) => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="*" to="/" component={() => <Page1 />} />
        </Switch>
      </Router>
    </>
  );
};
