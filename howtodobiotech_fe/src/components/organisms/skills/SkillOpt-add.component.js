import React, { Component } from "react";
import styles from "./SkillOptAdd.module.css";
import { connect } from "react-redux";
import { createSkillOpt } from "../../../actions/skills";

import Select from "react-select";

import SkillOptDataService from "../../../service/Skill.service";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

const categoryOptions = [
  { id: 1, name: "MEDICINE" },
  { id: 2, name: "BIOINFORMATICS" },
  { id: 3, name: "ENERGY" },
  { id: 4, name: "FOOD" },
  { id: 5, name: "ENVIRONMENTAL" },
  { id: 6, name: "AGRICULTURE" },
  { id: 7, name: "MARINE" },
];

const countryOptions = [
  { id: 1, name: "ALBANIA" },
  { id: 2, name: "CROATIA" },
  { id: 3, name: "CZECHIA" },
  { id: 4, name: "ESTONIA" },
  { id: 5, name: "HUNGARY" },
  { id: 6, name: "LATVIA" },
  { id: 7, name: "LITHUANIA" },
  { id: 8, name: "POLAND" },
  { id: 9, name: "SLOVAKIA" },
  { id: 10, name: "SLOVENIA" },
  { id: 11, name: "UKRAINE" },
  { id: 12, name: "CEE" },
];

const skillCategoryOptions = [
  { id: 1, name: "WORKSHOP", title: "WORKSHOP" },
  { id: 2, name: "SUMMER_WINTER_SCHOOL", title: "SUMMER WINTER SCHOOL" },
  { id: 3, name: "CONFERENCE", title: "CONFERENCE" },
  { id: 4, name: "INTERNSHIP", title: "INTERNSHIP" },
  { id: 5, name: "ACADEMY", title: "ACADEMY" },
  { id: 6, name: "HACKATHON", title: "HACKATHON" },
];

class SkillOptUpdateForm extends Component {
  constructor(props) {
    super(props);

    const userId = localStorage.getItem("userId");

    this.state = {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      organizer: "",
      website: "",
      accountId: userId,
      countries: [],
      biotechCategories: [],
      skillCategories: [],
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value,
    });
  };

  handleCountriesChange = (selectedOptions) => {
    this.setState({
      countries: selectedOptions,
    });
  };

  handleBiotechCategoriesChange = (selectedOptions) => {
    this.setState({
      biotechCategories: selectedOptions,
    });
  };

  handleSkillCategoriesChange = (selectedOptions) => {
    this.setState({
      skillCategories: selectedOptions,
    });
  };

  createSkillOpt = () => {
    const {
      title,
      organizer,
      description,
      startDate,
      endDate,
      website,
      accountId,
      countries,
      biotechCategories,
      skillCategories,
    } = this.state;

    const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
    const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

    const data = {
      title,
      organizer,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      website,
      accountId,
      countries: countries.map((country) => ({
        id: country.value.id,
        name: country.value.name,
      })),
      biotechCategories: biotechCategories.map((category) => ({
        id: category.value.id,
        name: category.value.name,
      })),
      skillCategories: skillCategories.map((skillCategory) => ({
        id: skillCategory.value.id,
        name: skillCategory.value.name,
      })),
    };

    SkillOptDataService.createSkillOpt(data)
      .then((response) => {
        console.log(response);
        // Handle successful creation (e.g., redirect, show success message)
      })
      .catch((error) => {
        console.log(error);
        console.log(data);
        // Handle error (e.g., show error message)
      });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  render() {
    const {
      title,
      description,
      startDate,
      endDate,
      organizer,
      website,
      countries,
      biotechCategories,
      skillCategories,
    } = this.state;

    return (
      <MDBContainer fluid className={styles.container}>
        <MDBRow
          className={`${styles.row} d-flex justify-content-center align-items-center h-100`}
        >
          <MDBCol col="12" className={`${styles.column} m-5`}>
            <MDBCard className={`${styles.card} ${styles.cardUpdate}`}>
              <MDBCardBody className={styles.cardBody}>
                <MDBRow>
                  <MDBCol
                    md="6"
                    className={`${styles.textWhite} ${styles.bgIndigo} ${styles.card} `}
                  >
                    <h4
                      className={`${styles.heading} ${styles.headingNormal} ${styles.textWhite} `}
                    >
                      Update information here...
                    </h4>
                    <MDBInput
                      wrapperClass={styles.inputWrapper}
                      label="Title"
                      size="lg"
                      id="title"
                      type="text"
                      name="title"
                      value={title}
                      onChange={this.handleInputChange}
                    />
                    <MDBInput
                      wrapperClass={styles.inputWrapper}
                      label="Description"
                      size="lg"
                      id="description"
                      type="text"
                      name="description"
                      value={description}
                      onChange={this.handleInputChange}
                    />
                    <MDBInput
                      wrapperClass={styles.inputWrapper}
                      label="Website"
                      size="lg"
                      id="website"
                      type="text"
                      name="website"
                      value={website}
                      onChange={this.handleInputChange}
                    />
                    <MDBInput
                      wrapperClass={styles.inputWrapper}
                      label="Organizer"
                      size="lg"
                      id="organizer"
                      type="text"
                      name="organizer"
                      value={organizer}
                      onChange={this.handleInputChange}
                    />
                    <MDBInput
                      wrapperClass={styles.inputWrapper}
                      label="Start Date"
                      size="lg"
                      id="startDate"
                      type="date"
                      name="startDate"
                      value={startDate}
                      onChange={this.handleInputChange}
                    />
                    <MDBInput
                      wrapperClass={styles.inputWrapper}
                      label="End Date"
                      size="lg"
                      id="endDate"
                      type="date"
                      name="endDate"
                      value={endDate}
                      onChange={this.handleInputChange}
                    />
                    <Select
                      className={`${styles.select} ${styles.textSelect}`}
                      options={categoryOptions.map((category) => ({
                        value: category,
                        label: category.name,
                        key: `category-${category.id}`,
                      }))}
                      isMulti
                      onChange={this.handleBiotechCategoriesChange}
                      value={biotechCategories}
                    />
                    <Select
                      className={`${styles.select} ${styles.textSelect}`}
                      options={skillCategoryOptions.map((skillCategory) => ({
                        value: skillCategory,
                        label: skillCategory.title,
                        key: `category-${skillCategory.id}`,
                      }))}
                      isMulti
                      onChange={this.handleSkillCategoriesChange}
                      value={skillCategories}
                    />
                    <Select
                      className={`${styles.select} ${styles.textSelect}`}
                      options={countryOptions.map((country) => ({
                        value: country,
                        label: country.name,
                        key: `country-${country.id}`,
                      }))}
                      isMulti
                      onChange={this.handleCountriesChange}
                      value={countries}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol className={`${styles.textCenter} ${styles.buttons}`}>
                    <button
                      className={styles.btnUpdate}
                      onClick={this.createSkillOpt}
                    >
                      Add
                    </button>

                    <button onClick={this.goBack} className={styles.btnBack}>
                      Back
                    </button>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default connect(null, { createSkillOpt })(SkillOptUpdateForm);
