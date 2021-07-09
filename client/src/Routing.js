import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { App } from "./Pages/App";
import { MoreDetailsPage } from "./Pages/moreDetails/MoreDetailsPage";

export const Routing = () => {
  return (
    <>
      <Router>
        <Switch>
          
          <Route
              path="/city/:city/:id/:mode"
              component={() => <MoreDetailsPage/>}
            />
            <Route path="*" to="/" component={() => <App />} />
        </Switch>
      </Router>
    </>
  );
};
