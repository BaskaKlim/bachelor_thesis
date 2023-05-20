import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Footer from "./components/organisms/common/Footer.component";

import NetworkPage from "./components/pages/Network.page";
import StartupOptPage from "./components/pages/StartupPage";
import SkillPage from "./components/pages/SkillPage";
import DashboardPage from "./components/pages/Dashboard.page"

import RegistrationForm from "./components/templates/users/Registration.form";
import LoginForm from "./components/templates/users/Login.form";

import AddStartupOpt from "./components/organisms/startups/AddStartupOpt";
import AddSkillOpt from "./components/organisms/skills/AddSkillOpt";
import SkillOptUpdateForm from"./components/templates/skills/UpdateSkillOpt"
import StartupOptUpdateForm from"./components/templates/startups/UpdateStartupOpt";

import AccountUpdateForm from"./components/templates/users/Account-update.form"


import Innovation from "./components/organisms/network/Innovation";
import StartupOpt from "./components/organisms/startups/StartupOpt";
import SkillOpt from "./components/organisms/skills/SkillOpt";
import Expert from "./components/organisms/network/Expert.component";
import Account from"./components/organisms/users/Account.component";

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

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
                         My Account
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
              <Route path="/register" component={RegistrationForm} />
              <Route path="/login" component={LoginForm} />


            
              <PrivateRoute
                path="/startup-opportunities/add"
                component={AddStartupOpt}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path="/skill-opportunities/add"
                component={AddSkillOpt}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path="/startup-opportunities/update/:id"
                component={StartupOptUpdateForm}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path="/skill-opportunities/update/:id"
                component={SkillOptUpdateForm}
                isAuthenticated={isAuthenticated}
              />
              <PrivateRoute
                path="/dashboard"
                component={DashboardPage}
                isAuthenticated={isAuthenticated}
              />

             
              <Route path="/skill-opportunities/update/:id" component={SkillOptUpdateForm}/>
              <Route path="/startup-opportunities/update/:id" component={StartupOptUpdateForm}/>
              <Route path="/accounts/update/:id" component={AccountUpdateForm} />
              <PrivateRoute path="/startup-opportunities/:id" component={StartupOpt} />
              <PrivateRoute path="/skill-opportunities/:id" component={SkillOpt} />
              <PrivateRoute path="/accounts/:id" component={Account} />

              <PrivateRoute path="/experts/:id" component={Expert} />
              <PrivateRoute path="/innovations/:id" component={Innovation} />

            </Switch>
          </div>
        </Router>

        <Footer />
      </>
    );
  }
}

export default App;
