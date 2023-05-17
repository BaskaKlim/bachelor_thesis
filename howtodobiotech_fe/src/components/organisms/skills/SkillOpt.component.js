import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSkillOpt, deleteSkillOpt } from "../../../actions/skills";
import SkillOptDataService from "../../../service/Skill.service";

import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
} from "mdb-react-ui-kit";

import CountryLabel from "../../atoms/common/Country.label";
import CategoryLabel from "../../atoms/common/Category.label";
import styles from "./SkillComponent.module.css";

const categoryOptions = [
  {
    id: 1,
    name: "MEDICINE",
    imageUrl: "/assets/medicine.jpg",
    color: "#E35149",
  },
  {
    id: 2,
    name: "BIOINFORMATICS",
    imageUrl: "/assets/bioinformatics.jpg",
    color: "#110777",
  },
  { id: 3, name: "ENERGY", imageUrl: "/assets/energy.jpg", color: "#7369ff" },
  { id: 4, name: "FOOD", imageUrl: "/assets/food.jpg", color: "#FF928F" },
  {
    id: 5,
    name: "ENVIRONMENTAL",
    imageUrl: "/assets/environmental.jpg",
    color: "#91B3FA",
  },
  {
    id: 6,
    name: "AGRICULTURE",
    imageUrl: "/assets/agriculture.jpg",
    color: "#A22B25",
  },
  { id: 7, name: "MARINE", imageUrl: "/assets/marine.jpg", color: "#4B4DF7" },
];
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
        this.props.history.push("/skill-opportunities/update/" + skillOpt.id);
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

  makeChanges = () => {
    const { skillOpt } = this.state;
    this.props.history.push(`/skill-opportunities/update/${skillOpt.id}`);
  };

  goBack = () => {
    const { skillOpt } = this.state;
    this.props.history.push(`/skill-opportunities/${skillOpt.id}`);
  };

  render() {
    const { skillOpt } = this.state;

    const biotechCategory =
      skillOpt && skillOpt.biotechCategories && skillOpt.biotechCategories[0];

    const selectedCategoryOption = categoryOptions.find(
      (option) => biotechCategory && option.name === biotechCategory.name
    );

    const imageUrl = selectedCategoryOption
      ? selectedCategoryOption.imageUrl
      : "";

    return (
      <MDBContainer fluid="true">
        <MDBCard className={`${styles.textBlack} ${styles.registrationCard}`}>
          <div className={styles.introText} fluid="true">
            <MDBCardTitle className={styles.heading}>
              Detail information
            </MDBCardTitle>
            <MDBCol className={styles.textCenter}>
              See detail information about Skill Opportunity you provided. You
              can easily keep updated your information or delete select
              opportunity by clicking on update option.
            </MDBCol>
          </div>

          <MDBCardBody>
            <MDBRow>
              <MDBCol md="6" className={styles.card}>
                {skillOpt && (
                  <div>
                    <MDBRow>
                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Title</label>
                          <div className={styles.value}>{skillOpt.title}</div>
                        </div>
                      </MDBCol>
                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Website</label>
                          <div className={styles.website}>
                            <FontAwesomeIcon icon={faGlobe} />
                          </div>
                        </div>
                      </MDBCol>
                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Start Date</label>
                          <div className={styles.dateValue}>
                            {skillOpt.startDate}
                          </div>
                        </div>
                      </MDBCol>
                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>End Date</label>
                          <div className={styles.dateValue}>
                            {skillOpt.endDate}
                          </div>
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <div className={styles.inputWrapper}>
                      <label className={styles.label}>Description</label>
                      <div className={styles.value}>{skillOpt.description}</div>
                    </div>

                    <MDBRow>
                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Countries</label>
                          <div className={styles.value}>
                            {skillOpt.countries.map((country) => (
                              <CountryLabel
                                key={country.id}
                                country={country}
                              />
                            ))}
                          </div>
                        </div>
                      </MDBCol>

                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Categories</label>
                          <div className={styles.value}>
                            {skillOpt.biotechCategories.map((category) => (
                              <CategoryLabel
                                key={category.id}
                                category={category}
                              />
                            ))}
                          </div>
                        </div>
                      </MDBCol>

                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>
                            Type of opportunity
                          </label>
                          <div className={styles.value}>
                            {skillOpt.skillCategories.map((category) => (
                              <CategoryLabel
                                key={category.id}
                                category={category}
                              />
                            ))}
                          </div>
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <btn
                      onClick={this.makeChanges}
                      className={styles.btnUpdate}
                    >
                      Make Changes
                    </btn>
                  </div>
                )}
              </MDBCol>
              <MDBCol
                md="10"
                lg="6"
                className={`${styles.order1} ${styles.orderLg2} ${styles.alignItemsCenter}`}
              >
                <div className={styles.registrationImage}>
                  <MDBCardImage src={imageUrl} fluid="true" />
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
const mapStateToProps = (state) => ({
  skillOpts: state.skillOpts,
});

export default connect(mapStateToProps, { updateSkillOpt, deleteSkillOpt })(
  SkillOpt
);
