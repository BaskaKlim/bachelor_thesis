import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./components/organisms/common/Footer.component";

import AddInnovation from "./components/templates/network/Innovation-add.component";
import AddStartupOpt from "./components/templates/startups/StartupOpt-add.component";
import RegistrationForm from "./components/templates/users/Registration.form";

import Innovation from "./components/organisms/network/Innovation.component";
import StartupOpt from "./components/organisms/startups/StartupOpt.component";

import NetworkPage from "./components/pages/Network.page";
import StartupOptPage from "./components/pages/Startup.page";
import SkillPage from "./components/pages/Skill.page";

class App extends Component {
  render() {
    return (
      <>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <Link to={"/innovations"} className="navbar-brand">
                <img src="/assets/logo_nav_black.png" alt="Logo" height="30" />
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link to={"/skills"} className="nav-link">
                      Skills
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/startups"} className="nav-link">
                      Startups
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/network"} className="nav-link">
                      Network
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/registration"} className="nav-link">
                      Register
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/network"]} component={NetworkPage} />
              <Route path="/startups" component={StartupOptPage} />
              <Route path="/skills" component={SkillPage} />{" "}
              {/* Add new route for SkillPage */}
              <Route path="/innovations/add" component={AddInnovation} />
              <Route
                path="/startup-opportunities/add"
                component={AddStartupOpt}
              />
              <Route path="/innovations/:id" component={Innovation} />
              <Route path="/startup-opportunities/:id" component={StartupOpt} />
              <Route path="/registration" component={RegistrationForm} /> {/* Update route path */}
            </Switch>
          </div>
        </Router>

        <Footer />
      </>
    );
  }
}

export default App;
