import React, { Component } from "react";
import SkillOptListByAccount from "../templates/skills/SkillOptsByAccount-list.component";
import styles from "./DashboardPage.module.css";
class DashboardPage extends Component {
  render() {
    return (
      <div className={styles.dashboard}>
        <div className={styles.title}>
          <h1>Dashboard</h1>
        </div>

        <SkillOptListByAccount />
      </div>
    );
  }
}

export default DashboardPage;
