import React, { Component } from "react";
import { connect } from "react-redux";
import { getSkillOptsByAccountId } from "../../../actions/skills";
import SkillOptDataService from "../../../service/Skill.service";
import { Link } from "react-router-dom";
import styles from "./SkillOptsByAccountList.module.css";
import NotFoundPage from "../../organisms/common/NotFoundPage.component";

class SkillOptsByAccountList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skillOpts: [],
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    if (userId) {
      SkillOptDataService.getSkillOptsByAccountId(userId)
        .then((response) => {
          const skillOpts = response.data;
          this.setState({ skillOpts });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    const { skillOpts } = this.state;

    return (
      <div>
        <div className={styles.title}>
          <h4>Your skill opportunities:</h4>
        </div>

        <div style={{ margin: "50px 0" }}></div>
        {skillOpts.length > 0 ? (
          <table
            className={`${styles.skillOptsTable} ${styles.dashboardTable}`}
          >
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
                      className={styles.detailButton}
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
            text="You have not register any skill opportunity yet. Do it now."
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  skillOpts: state.skillOpts,
});

export default connect(mapStateToProps, { getSkillOptsByAccountId })(
  SkillOptsByAccountList
);
