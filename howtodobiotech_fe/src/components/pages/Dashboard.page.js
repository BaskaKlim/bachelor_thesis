import React, { Component } from "react";
import SkillOptListByAccount from "../templates/skills/SkillOptsByAccount-list.component";


class DashboardPage extends Component {
  render() {
  return (
    <div>
      <h1>Dashboard</h1>
      <SkillOptListByAccount />
    </div>
  );
};
}

export default DashboardPage;

