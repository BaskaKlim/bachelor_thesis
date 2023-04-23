import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AddSkillOpt from "./components/add-skillOpt.component";
import SkillOpt from "./components/skillOpt.component";
import SkillOptList from "./components/skillOpt-list.component";

class App extends Component {
  render() {
    return (
      <Router>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/skillOpts"} className="navbar-brand">
            HoeToDoBiotech
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/skillOpts"} className="nav-link">
              Skills
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/add"} className="nav-link">
                Add
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/skillOpts"]} component={SkillOptList} />
            <Route exact path="/add" component={AddSkillOpt} />
            <Route path="/skillOpts/:id" component={SkillOpt} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
