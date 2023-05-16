import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllSkillOpts } from "../../../actions/skills";
import SkillOptDataService from "../../../service/Skill.service";
import { Link } from "react-router-dom";
import styles from "./SkillOptsList.module.css";
import NotFoundPage from "../../organisms/common/NotFoundPage.component";

class SkillOptList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skillOpts: [],
    };
  }

  componentDidMount() {
    SkillOptDataService.getAllSkillOpts()
      .then((response) => {
        const skillOpts = response.data;
        this.setState({ skillOpts });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const { skillOpts } = this.state;

    return (
      <div>
        <div style={{ margin: "50px 0" }}></div>
        {skillOpts.length > 0 ? (
          <table className={styles["skill-opts-table"]}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {skillOpts.map((skillOpt) => (
                <tr key={skillOpt.id}>
                  <td>{skillOpt.title}</td>
                  <td>{skillOpt.description}</td>
                  <td>
                    <Link
                      to={`/skill-opportunities/${skillOpt.id}`}
                      className={styles["details-button"]}
                    >
                      Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NotFoundPage
            title="We are sorry!"
            text="No skill opportunities were found. Sign up for our newsletter to stay updated!"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  skillOpts: state.skillOpts,
});

export default connect(mapStateToProps, { getAllSkillOpts })(SkillOptList);
