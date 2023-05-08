import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./components/common/organisms/Footer";

import AddInnovation from "./components/innovations/templates/add-innovation.component";
import AddStartupOpt from "./components/startups/templates/add-startup-opt.component";

import Innovation from "./components/innovations/organisms/innovation.component";
import StartupOpt from "./components/startups/organisms/startupOpt.component";

import NetworkPage from "./components/innovations/pages/network.page";
import StartupOptPage from "./components/startups/pages/startup.page";
import SkillPage from "./components/skills/pages/Skill.page"; // Import SkillPage component


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
                    <Link to={"/startups"} className="nav-link">
                      Startup Opportunities
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/network"} className="nav-link">
                      Network
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/innovations/add"} className="nav-link">
                      AddInnovation
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/startup-opportunities/add"} className="nav-link">
                      AddStartup
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
              <Route path="/skills" component={SkillPage} /> {/* Add new route for SkillPage */}
              <Route path="/innovations/add" component={AddInnovation} />
              <Route path="/startup-opportunities/add" component={AddStartupOpt} />
              <Route path="/innovations/:id" component={Innovation} />
              <Route path="/startup-opportunities/:id" component={StartupOpt} />
            </Switch>
          </div>
        </Router>

        <Footer />
      </>
    );
  }
}

export default App;
