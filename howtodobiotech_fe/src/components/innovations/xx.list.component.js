import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getAllInnovations,
  getInnovationByTitle,
} from "../actions/innovations";
import { Link } from "react-router-dom";
import InnovationDataService from "../service/innovation.service";




class InnovationsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.setActiveInnovation = this.setActiveInnovation.bind(this);
    this.getInnovationByTitle = this.getInnovationByTitle.bind(this);

    this.state = {
      currentInnovation: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    InnovationDataService.getAllInnovations()
      .then((response) => {
        this.setState({ innovations: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle,
    });
  }

  refreshData() {
    this.setState({
      currentInnovation: null,
      currentIndex: -1,
    });
  }

  setActiveInnovation(innovation, index) {
    this.setState({
      currentInnovation: innovation,
      currentIndex: index,
    });
  }

  getInnovationByTitle() {
    this.refreshData();

    this.props.getInnovationByTitle(this.state.searchTitle);
  }

  render() {
    const { innovations } = this.state;
    const { searchTitle, currentInnovation, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.getInnovationByTitle}
              >
                {" "}
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Innovations List</h4>
          <ul className="list-group">
            {innovations &&
              innovations.map((innovation, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveInnovation(innovation, index)}
                  key={index}
                >
                  {innovation.title}
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentInnovation ? (
            <div>
              <h4>Innovation</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentInnovation.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentInnovation.description}
              </div>
            

              <Link
                to={"/innovations/" + currentInnovation.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Innovation...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  innovations: state.innovations,
});

export default connect(mapStateToProps, { getAllInnovations, getInnovationByTitle })(
  InnovationsList
);