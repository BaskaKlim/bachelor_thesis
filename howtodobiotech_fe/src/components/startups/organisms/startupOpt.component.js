import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStartupOpt, deleteStartupOpt } from "../../../actions/startups";
import StartupOptDataService from "../../../service/startupOpt.service";

class StartupOpt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startupOpt: null,
    };
  }

  componentDidMount() {
    this.getStartupOptById(this.props.match.params.id);
  }

  getStartupOptById(id) {
    StartupOptDataService.getStartupOptById(id)
      .then((response) => {
        this.setState({ startupOpt: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateStartupOpt = () => {
    const { startupOpt } = this.state;
    this.props
      .updateStartupOpt(startupOpt.id, startupOpt)
      .then(() => {
        this.props.history.push("/startup-opts");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  deleteStartupOpt = () => {
    const { startupOpt } = this.state;
    this.props
      .deleteStartupOpt(startupOpt.id)
      .then(() => {
        this.props.history.push("/startup-opts");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { startupOpt } = this.state;

    return (
      <div>
        {startupOpt ? (
          <div>
            <p>
              <strong>Title:</strong> {startupOpt.title}
            </p>
            <p>
              <strong>Provider:</strong> {startupOpt.provider}
            </p>
            <p>
              <strong>Description:</strong> {startupOpt.description}
            </p>
            <p>
              <strong>Start Date:</strong> {startupOpt.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {startupOpt.endDate}
            </p>
            <p>
              <strong>Website:</strong> {startupOpt.website}
            </p>
            <p>
              <strong>Countries:</strong>{" "}
              {startupOpt.countries.map((country) => country.name).join(", ")}
            </p>
            <p>
              <strong>Categories:</strong>{" "}
              {startupOpt.categories
                .map((category) => category.name)
                .join(", ")}
            </p>
            <p>
              <strong>Support Categories:</strong>{" "}
              {startupOpt.supportCategories
                .map((supportCategory) => supportCategory.name)
                .join(", ")}
            </p>

            <button onClick={this.updateStartupOpt} className="btn btn-warning">
              Update
            </button>
            <button onClick={this.deleteStartupOpt} className="btn btn-danger">
              Delete
            </button>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  startupOpts: state.startupOpts,
});

export default connect(mapStateToProps, { updateStartupOpt, deleteStartupOpt })(
  StartupOpt
);
