import React, { Component } from "react";
import SkillOptListByAccount from "../templates/skills/SkillOptsByAccountList";
import SupportOptListByAccount from "../templates/startups/StartupOptsByAccountList";

import styles from "./DashboardPage.module.css";
class DashboardPage extends Component {
  render() {
    return (
      <div className={styles.dashboard}>
        <div className={styles.title}>
          <h1>Dashboard</h1>
        </div>

        <SkillOptListByAccount />
        <SupportOptListByAccount />
      </div>
    );
  }
}

export default DashboardPage;
