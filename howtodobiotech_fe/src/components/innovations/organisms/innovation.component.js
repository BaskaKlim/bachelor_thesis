import React, { Component } from "react";
import { connect } from "react-redux";
import { updateInnovation, deleteInnovation } from "../../../actions/innovations";
import InnovationDataService from "../../../service/innovation.service";

class Innovation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      innovation: null,
    };
  }

  componentDidMount() {
    this.getInnovationById(this.props.match.params.id);
  }

  getInnovationById(id) {
    InnovationDataService.getInnovationById(id)
      .then((response) => {
        this.setState({ innovation: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateInnovation = () => {
    const { innovation } = this.state;
    this.props
      .updateInnovation(innovation.id, innovation)
      .then(() => {
        this.props.history.push("/innovations");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  deleteInnovation = () => {
    const { innovation } = this.state;
    this.props
      .deleteInnovation(innovation.id)
      .then(() => {
        this.props.history.push("/innovations");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { innovation } = this.state;

    return (
      <div>
        {innovation ? (
          <div>
            <h4>Innovation</h4>
            <p>
              <strong>Title:</strong> {innovation.title}
            </p>
            <p>
              <strong>Description:</strong> {innovation.description}
            </p>
            <p>
              <strong>Website:</strong> {innovation.website}
            </p>
            <p>
              <strong>Countries:</strong>{" "}
              {innovation.countries.map((country) => country.name).join(", ")}
            </p>
            <p>
              <strong>Categories:</strong>{" "}
              {innovation.categories
                .map((category) => category.name)
                .join(", ")}
            </p>

            <button onClick={this.updateInnovation} className="btn btn-warning">
              Update
            </button>
            <button onClick={this.deleteInnovation} className="btn btn-danger">
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
  innovations: state.innovations,
});


export default connect(mapStateToProps, { updateInnovation, deleteInnovation })(
  Innovation
);