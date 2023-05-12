import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSkillOpt, deleteSkillOpt } from "../../../actions/skillOpts";
import SkillOptDataService from "../../../service/SkillOpt.service";

class SkillOpt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skillOpt: null,
    };
  }

  componentDidMount() {
    this.getSkillOptById(this.props.match.params.id);
  }

  getSkillOptById(id) {
    SkillOptDataService.getSkillOptById(id)
      .then((response) => {
        this.setState({ skillOpt: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateSkillOpt = () => {
    const { skillOpt } = this.state;
    this.props
      .updateSkillOpt(skillOpt.id, skillOpt)
      .then(() => {
        this.props.history.push("/skill-opportunities");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  deleteSkillOpt = () => {
    const { skillOpt } = this.state;
    this.props
      .deleteSkillOpt(skillOpt.id)
      .then(() => {
        this.props.history.push("/skill-opportunities");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const { skillOpt } = this.state;

    return (
      <div>
        {skillOpt ? (
          <div>
            <p>
              <strong>Title:</strong> {skillOpt.title}
            </p>
            <p>
              <strong>Organizer:</strong> {skillOpt.organizer}
            </p>
            <p>
              <strong>Description:</strong> {skillOpt.description}
            </p>
            <p>
              <strong>Start Date:</strong> {skillOpt.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {skillOpt.endDate}
            </p>
            <p>
              <strong>Website:</strong> {skillOpt.website}
            </p>
            <p>
              <strong>Countries:</strong>{" "}
              {skillOpt.countries.map((country) => country.name).join(", ")}
            </p>
            <p>
              <strong>Biotech Categories:</strong>{" "}
              {skillOpt.biotechCategories
                .map((category) => category.name)
                .join(", ")}
            </p>
            <p>
              <strong>Skill Categories:</strong>{" "}
              {skillOpt.skillCategories
                .map((category) => category.name)
                .join(", ")}
            </p>

            <button onClick={this.updateSkillOpt} className="btn btn-warning">
              Update
            </button>
            <button onClick={this.deleteSkillOpt} className="btn btn-danger">
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
  skillOpts: state.skillOpts,
});

export default connect(mapStateToProps, { updateSkillOpt, deleteSkillOpt })(
  SkillOpt
);
