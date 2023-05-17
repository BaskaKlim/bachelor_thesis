import React, { Component } from "react";
import styles from "./SkillOptUpdate.module.css";
import { connect } from "react-redux";
import { updateSkillOpt, deleteSkillOpt } from "../../../actions/skills";

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

import CountryLabel from "../../atoms/common/Country.label";
import CategoryLabel from "../../atoms/common/Category.label";
import Button from "../../atoms/common/CallToAction.button";

const categoryOptions = [
  { id: 1, name: "MEDICINE" },
  {
    id: 2,
    name: "BIOINFORMATICS",
  },
  { id: 3, name: "ENERGY" },
  { id: 4, name: "FOOD" },
  {
    id: 5,
    name: "ENVIRONMENTAL",
  },
  {
    id: 6,
    name: "AGRICULTURE",
  },
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

const skillCategoryOption = [
  {
    id: 1,
    name: "WORKSHOP",
    title: "WORKSHOP",
    imageUrl: "/assets/workshop.png",
    color: "#FFA6A2",
  },
  {
    id: 2,
    name: "SUMMER_WINTER_SCHOOL",
    title: "SUMMER WINTER SCHOOL",
    imageUrl: "/assets/school.png",
    color: "#4B4DF7",
  },
  {
    id: 3,
    name: "CONFERENCE",
    title: "CONFERENCE",
    imageUrl: "/assets/conference.png",
    color: "#FE7062",
  },
  {
    id: 4,
    name: "INTERNSHIP",
    title: "INTERNSHIP",
    imageUrl: "/assets/internship.png",
    color: "#CEDAF6",
  },
  {
    id: 5,
    name: "ACADEMY",
    title: "ACADEMY",
    imageUrl: "/assets/academy.png",
    color: "#B23730",
  },
  {
    id: 6,
    name: "HACKATHON",
    title: "HACKATHON",
    imageUrl: "/assets/hackathon.png",
    color: "#9695F2",
  },
];

class SkillOptUpdateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skillOpt: null,
      updatedTitle: "",
      updatedDescription: "",
      updatedStartDate: "",
      updatedEndDate: "",
      updatedOrganizer: "", 
      updatedWebsite: "",
      updatedCountries: [],
      updatedBiotechCategories: [],
      updatedSkillCategories: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getSkillOptById(id);
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
      updatedCountries: selectedOptions,
    });
  };

  handleBiotechCategoriesChange = (selectedOptions) => {
    this.setState({
      updatedBiotechCategories: selectedOptions,
    });
  };

  handleSkillCategoriesChange = (selectedOptions) => {
    this.setState({
      updatedSkillCategories: selectedOptions,
    });
  };

  updateSkillOpt = () => {
    const {
      skillOpt,
      updatedTitle,
      updatedDescription,
      updatedWebsite,
      updatedCountries,
      updatedBiotechCategories,
      updatedSkillCategories,
      updatedStartDate,
      updatedEndDate,
    } = this.state;
    const countryValues = updatedCountries.map((country) => ({
      id: country.value.id,
      name: country.value.name,
    }));

    const biotechCategoryValues = updatedBiotechCategories.map((category) => ({
      id: category.value.id,
      name: category.value.name,
    }));

    const skillCategoryValues = updatedSkillCategories.map((skillCategory) => ({
      id: skillCategory.value.id,
      name: skillCategory.value.name,
    }));

    const updatedSkillOpt = {
      id: skillOpt.id,
      title: updatedTitle,
      description: updatedDescription,
      website: updatedWebsite,
      countries: countryValues,
      biotechCategories: biotechCategoryValues,
      skillCategories: skillCategoryValues,
      startDate: updatedStartDate,
      endDate: updatedEndDate,
      organizer: skillOpt.organizer, // Set to the value of skillOpt.organizer
      accountId: localStorage.getItem("userId"), // Set accountId to userId from Local Storage
    };

    this.props
      .updateSkillOpt(skillOpt.id, updatedSkillOpt)
      .then((response) => {
        console.log("Update response:", response);
        this.getSkillOptById(skillOpt.id);
        this.props.history.push("/skill-opportunities/update/" + skillOpt.id);
      })
      .catch((e) => {
        console.log("Update response:", updatedSkillOpt);
        console.log(e);
        console.log(updatedSkillOpt);
      });
  };

  handleCountryChange = (selectedCountries) => {
    const updatedCountries = selectedCountries.map((country) => ({
      value: country.value,
      label: country.label,
    }));
    this.setState({ updatedCountries });
  };

  handleCategoryChange = (selectedCategories) => {
    const updatedCategories = selectedCategories.map((category) => ({
      value: category.value,
      label: category.label,
    }));
    this.setState({ updatedCategories });
  };

  handleSkillCategoryChange = (selectedSkillCategory) => {
    const updatedSkillCategories = selectedSkillCategory.map(
      (skillCategory) => ({
        value: skillCategory.value,
        label: skillCategory.label,
      })
    );
    this.setState({ updatedSkillCategories });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  deleteSkillOpt = () => {
    const { skillOpt } = this.state;
    this.props
      .deleteSkillOpt(skillOpt.id)
      .then(() => {
        this.props.history.push("/dashboard");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  render() {
    const {
      skillOpt,
      updatedTitle,
      updatedDescription,
      updatedStartDate,
      updatedEndDate,
      updatedWebsite,
      updatedCountries,
      updatedBiotechCategories,
      updatedSkillCategories,
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
                          <div className={styles.value}>{skillOpt.website}</div>
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
                   
                  </div>
                )}
              </MDBCol>

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
                      id="updatedTitle"
                      type="
                  text"
                      name="updatedTitle"
                      value={updatedTitle}
                      onChange={this.handleInputChange}
                    />
                    <MDBInput
                      wrapperClass={styles.inputWrapper}
                      label="Description"
                      size="lg"
                      id="updatedDescription"
                      type="text"
                      name="updatedDescription"
                      value={updatedDescription}
                      onChange={this.handleInputChange}
                    />
                    <MDBInput
                      wrapperClass={styles.inputWrapper}
                      label="Website"
                      size="lg"
                      id="updated Website"
                      type="text"
                      name="updatedWebsite"
                      value={updatedWebsite}
                      onChange={this.handleInputChange}
                    />
                    <MDBInput
                      wrapperClass={styles.inputWrapper}
                      label="Start Date"
                      size="lg"
                      id="updatedStartDate"
                      type="date"
                      name="updatedStartDate"
                      value={updatedStartDate}
                      onChange={this.handleInputChange}
                    />
                    <MDBInput
                      wrapperClass={styles.inputWrapper}
                      label="End Date"
                      size="lg"
                      id="updatedEndDate"
                      type="date"
                      name="updatedEndDate"
                      value={updatedEndDate}
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
                      value={updatedBiotechCategories}
                    />
                    <Select
                      className={`${styles.select} ${styles.textSelect}`}
                      options={skillCategoryOption.map((skillCategory) => ({
                        value: skillCategory,
                        label: skillCategory.name,
                        key: `calegory-${skillCategory.id}`,
                      }))}
                      isMulti
                      onChange={this.handleSkillCategoriesChange}
                      value={updatedSkillCategories}
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
                      value={updatedCountries}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol className={`${styles.textCenter} ${styles.buttons}`}>
                    <button
                      className={styles.btnUpdate}
                      onClick={this.updateSkillOpt}
                    >
                      Update
                    </button>
                    <button
                      className={styles.btnDelete}
                      onClick={this.deleteSkillOpt}
                    >
                      Delete
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

const mapStateToProps = (state) => ({
  innovations: state.innovations,
});

export default connect(mapStateToProps, { updateSkillOpt, deleteSkillOpt })(
  SkillOptUpdateForm
);
