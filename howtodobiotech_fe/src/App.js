import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./components/organisms/common/Footer.component";

import NetworkPage from "./components/pages/Network.page";
import StartupOptPage from "./components/pages/Startup.page";
import SkillPage from "./components/pages/Skill.page";
import DashboardPage from "./components/pages/Dashboard.page"

import RegistrationForm from "./components/templates/users/Registration.form";
import LoginForm from "./components/templates/users/Login.form";

import AddInnovation from "./components/organisms/network/Innovation-add.component";
import AddStartupOpt from "./components/organisms/startups/StartupOpt-add.component";
import AddSkillOpt from "./components/organisms/skills/AddSkillOpt";
import InnovationUpdateForm from "./components/templates/network/Innovation-update.form";
import AccountUpdateForm from"./components/templates/users/Account-update.form"
import SkillOptUpdateForm from"./components/templates/skills/SkillOpt-update.form"

import Innovation from "./components/organisms/network/Innovation.component";
import StartupOpt from "./components/organisms/startups/StartupOpt.component";
import SkillOpt from "./components/organisms/skills/SkillOpt.component";
import Expert from "./components/organisms/network/Expert.component";
import Account from"./components/organisms/users/Account.component";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: !!localStorage.getItem("authToken"),
    };
    this.logout = this.logout.bind(this);
    this.login = this.login.bind(this);
  }

  logout() {
    localStorage.removeItem("authToken");
    this.setState({ isAuthenticated: false });
  }

  login() {
  this.setState({ isAuthenticated: true }, () => {
    window.location.reload();
  });
}


  render() {
    const { isAuthenticated } = this.state;

    return (
      <>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
              <Link to={"/skills"} className="navbar-brand">
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
                  {isAuthenticated ? (
                    <>
                      <li className="nav-item">
                        <Link to={"/dashboard"} className="nav-link">
                          Moje konto
                        </Link>
                      </li>
                    
                      <li className="nav-item">
                        <Link to={"/"} className="nav-link" onClick={this.logout}>
                          Logout
                        </Link>
                      </li>
                    </>
                  ) : (
                    <li className="nav-item">
                      <Link to={"/login"} className="nav-link" onClick={this.login}>
                        Login
                     
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/network"]} component={NetworkPage} />
              <Route path="/startups" component={StartupOptPage} />
              <Route path="/skills" component={SkillPage} />
              <Route path="/dashboard" component={DashboardPage} />

              <Route path="/innovations/add" component={AddInnovation} />
              <Route path="/startup-opportunities/add"component={AddStartupOpt}/>
              <Route path="/skill-opportunities/add" component={AddSkillOpt} />
             
              <Route path="/innovations/update/:id" component={InnovationUpdateForm}/>
              <Route path="/skill-opportunities/update/:id" component={SkillOptUpdateForm}/>
              <Route path="/accounts/update/:id" component={AccountUpdateForm} />

              <Route path="/innovations/:id" component={Innovation} />
              <Route path="/startup-opportunities/:id" component={StartupOpt} />
              <Route path="/skill-opportunities/:id" component={SkillOpt} />
              <Route path="/experts/:id" component={Expert} />
              <Route path="/accounts/:id" component={Account} />

              <Route path="/register" component={RegistrationForm} />
              <Route path="/login" component={LoginForm} />
            </Switch>
          </div>
        </Router>

        <Footer />
      </>
    );
  }
}

export default App;
