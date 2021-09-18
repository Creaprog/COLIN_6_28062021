import React, { Component } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Home from "./Home/Home";
import Photographer from "./Photographer/Photographer";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/photographer/:id' component={Photographer} />
          </Switch>
        </Router>
    );  
  }
}


export default App;