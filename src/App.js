import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  HashRouter,
} from "react-router-dom";

import Home from "./Home/Home";
import Photographer from "./Photographer/Photographer";

class App extends Component {
  render() {
    return (
      <HashRouter basename='/'>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/photographer/:id" component={Photographer} />
          </Switch>
        </Router>
      </HashRouter>
    );  
  }
}


export default App;