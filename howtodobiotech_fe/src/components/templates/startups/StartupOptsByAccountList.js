import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateStartupOpt, deleteStartupOpt } from "../../../actions/startups";
import StartupOptDataService from "../../../service/Startup.service";
import styles from "./StrtupOptsByAccountList.module.css";
import NotFoundPage from "../../organisms/common/NotFoundPage.component";

class StartupOptList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startupOpts: [],
    };
  }

  componentDidMount() {
    const userId = localStorage.getItem("userId");
    if (userId) {
      StartupOptDataService.getStartupOptsByAccountId(userId)
        .then((response) => {
          const startupOpts = response.data;
          this.setState({ startupOpts });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  render() {
    const { startupOpts } = this.state;
   

    return (
      <div>
        <div className={styles.title}>
          <h4>Your support opportunities:</h4>
        </div>

        <div style={{ margin: "50px 0" }}></div>
        {startupOpts.length > 0 ? (
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
              {startupOpts.map((startupOpt) => (
                <tr key={startupOpt.id}>
                  <td>{startupOpt.title}</td>
                  <td>{startupOpt.description}</td>
                  <td>
                    <Link
                      to={`/startup-opportunities/${startupOpt.id}`}
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
  startupOpt: state.startupOpt,
});

export default connect(mapStateToProps, { updateStartupOpt, deleteStartupOpt })(
  StartupOptList
);
