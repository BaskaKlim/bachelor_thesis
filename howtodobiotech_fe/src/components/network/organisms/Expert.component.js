import React, { Component } from "react";
import { connect } from "react-redux";
import { updateExpert, deleteExpert } from "../../../actions/experts";
import ExpertDataService from "../../../service/expert.service";

class Expert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expert: null,
    };
  }

  componentDidMount() {
    this.getExpertById(this.props.match.params.id);
  }

  getExpertById(id) {
    ExpertDataService.getExpertById(id)
      .then((response) => {
        this.setState({ expert: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateExpert = () => {
    const { expert } = this.state;
    this.props
      .updateExpert(expert.id, expert)
      .then(() => {
        this.props.history.push("/experts");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  deleteExpert = () => {
    const { expert } = this.state;
    this.props
      .deleteExpert(expert.id)
      .then(() => {
        this.props.history.push("/experts");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { expert } = this.state;

    return (
      <div>
        {expert ? (
          <div>
            <h4>Expert</h4>
            <p>
              <strong>First Name:</strong> {expert.firstName}
            </p>
            <p>
              <strong>Last Name:</strong> {expert.lastName}
            </p>
            <p>
              <strong>Job Position:</strong> {expert.jobPosition}
            </p>
        
            <p>
              <strong>LinkedIn URL:</strong> {expert.linkedinUrl}
            </p>
            <p>
              <strong>Background Description:</strong>{" "}
              {expert.backgroundDescription}
            </p>
            <p>
              <strong>Countries:</strong>{" "}
              {expert.countries.map((country) => country.name).join(", ")}
            </p>
            <p>
              <strong>Expertises:</strong>{" "}
              {expert.expertises
                .map((expertise) => expertise.name)
                .join(", ")}
            </p>

            <button onClick={this.updateExpert} className="btn btn-warning">
              Update
            </button>
            <button onClick={this.deleteExpert} className="btn btn-danger">
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
  experts: state.experts,
});

export default connect(mapStateToProps, { updateExpert, deleteExpert })(
  Expert
);
