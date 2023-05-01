import React, { Component } from "react";
import { connect } from "react-redux";
import { updateInnovation, deleteInnovation } from "../actions/innovations";
import InnovationDataService from "../service/innovation.service";

class Innovation extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getInnovation = this.getInnovation.bind(this);
    this.updateStatus = this.updateStatus.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.removeInnovation = this.removeInnovation.bind(this);

    this.state = {
        currentInnovation: {
        id: null,
        title: "",
        description: "",
      },
      message: "",
    };
  }

  componentDidMount() {
    this.getInnovation(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function (prevState) {
      return {
        currentInnovation: {
          ...prevState.currentInnovation,
          title: title,
        },
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;

    this.setState((prevState) => ({
        currentInnovation: {
        ...prevState.currentInnovation,
        description: description,
      },
    }));
  }

  getInnovation(id) {
    InnovationDataService.getInnovationById(id)
      .then((response) => {
        this.setState({
          currentInnovation: response.data,
        });
        console.log(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }



  updateContent() {
    this.props
      .updateInnovation(this.state.currentInnovation.id, this.state.currentInnovation)
      .then((reponse) => {
        console.log(reponse);
        
        this.setState({ message: "The innovation was updated successfully!" });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  removeInnovation() {
    this.props
      .deleteInnovation(this.state.currentInnovation.id)
      .then(() => {
        this.props.history.push("/innovations");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { currentInnovation } = this.state;

    return (
      <div>
        {currentInnovation ? (
          <div className="edit-form">
            <h4>Innovation</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentInnovation.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentInnovation.description}
                  onChange={this.onChangeDescription}
                />
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.removeInnovation}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateContent}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Innovation...</p>
          </div>
        )}
      </div>
    );
  }
}

export default connect(null, { updateInnovation, deleteInnovation })(Innovation);