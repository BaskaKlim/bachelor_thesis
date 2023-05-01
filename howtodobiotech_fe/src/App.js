import React,{ Component} from "react";
import { BrowserRouter as Router , Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';


import AddInnovation from "./components/add-innovation.component";
import Innovation from "./components/innovation.component";
import InnovationList from "./components/innovations-list.component";


class App extends Component {
  render() {
    return (
        <Router>
          <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/innovations"} className="navbar-brand">
            HowToDoBiotech
          </Link>
          <div className="navbar-nav mr-auto">
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
          </div>
        </nav>

        <div className="container mt-3">
          <Switch>
            <Route exact path={["/", "/innovations"]} component={InnovationList} />
            <Route exact path="/add" component={AddInnovation} />
            <Route path="/innovations/:id" component={Innovation} />
          </Switch>
        </div>
        </Router>
      );
  }
}
export default App;
