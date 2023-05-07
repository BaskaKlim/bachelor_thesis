import React,{ Component} from "react";
import { BrowserRouter as Router , Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Footer from './components/common/organisms/Footer';

import AddInnovation from "./components/innovations/templates/add-innovation.component";
import Innovation from "./components/innovations/organisms/innovation.component";
import NetworkPage from "./components/innovations/pages/network.page";
import StartupOptPage from "./components/startups/pages/startup.page"; 

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
                    <Link to={"/innovations"} className="nav-link">
                      Innovations
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/add"} className="nav-link">
                      Add
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to={"/startups"} className="nav-link">
                      Startup Opportunities
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/innovations"]} component={NetworkPage} />
              <Route exact path="/add" component={AddInnovation} />
              <Route path="/innovations/:id" component={Innovation} />
              <Route path="/startups" component={StartupOptPage} />
            </Switch>
          </div>
        </Router>

        <Footer />
      </>
    );
  }
}

export default App;
