import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllInnovations, getInnovationByTitle } from "../actions/innovations";
import { Link } from "react-router-dom";

class InnovationsList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.refreshData = this.refreshData.bind(this);
    this.getInnovationByTitle = this.getInnovationByTitle.bind(this);

    this.state = {
      currentInnovation: null,
      currentIndex: -1,
      searchTitle: "",
    };
  }

  componentDidMount() {
    this.props.getAllInnovations();
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

  getInnovationByTitle() {
    this.refreshData();

    this.props.getInnovationByTitle(this.state.searchTitle);
  }

  render() {
    const { searchTitle, currentInnovation, currentIndex } = this.state;
    const { innovations } = this.props;

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
                onClick={this.getInnovationtByTitle}
              > Search
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
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
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

const mapStateToProps = (state) => {
  return {
    innovations: state.innovations,
  };
};

export default connect(mapStateToProps, {
getAllInnovations,
getInnovationByTitle,
})(InnovationsList);