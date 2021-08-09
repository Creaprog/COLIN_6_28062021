import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./Home/Home";
import Photographer from "./Photographer/Photographer";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/photographer/:id">
          <Photographer />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;