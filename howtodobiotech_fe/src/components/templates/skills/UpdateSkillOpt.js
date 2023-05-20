import React, { Component } from "react";
import styles from "./UpdateSkillOpt.module.css";
import { connect } from "react-redux";
import { updateSkillOpt, deleteSkillOpt } from "../../../actions/skills";

import SkillOptDataService from "../../../service/Skill.service";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody
} from "mdb-react-ui-kit";

import CountryLabel from "../../atoms/common/Country.label";
import CategoryLabel from "../../atoms/common/Category.label";
import ButtonUpdate from "../../atoms/common/ButtonUpdate";
import ButtonBack from "../../atoms/common/ButtonBack";
import ButtonDelete from "../../atoms/common/ButtonDelete";
import InputField from "../../atoms/common/InputField";
import CountriesSelect from "../../molecules/CountriesSelect";
import SkillCategoriesSelect from "../../molecules/SkillCategoriesSelect";
import BiotechCategoriesSelect from "../../molecules/BiotechCategoriesSelect";

class SkillOptUpdateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skillOpt: null,
      formData: {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        website: "",
        countries: [],
        biotechCategories: [],
        skillCategories: [],
      },
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
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };
  handleCountriesChange = (selectedOptions) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        countries: selectedOptions,
      },
    }));
  };
  
  handleBiotechCategoriesChange = (selectedOptions) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        biotechCategories: selectedOptions,
      },
    }));
  };
  
  handleSkillCategoriesChange = (selectedOptions) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        skillCategories: selectedOptions,
      },
    }));
  };
  
  updateSkillOpt = () => {
    const {
      skillOpt,
      formData: {
        title: updatedTitle,
        description: updatedDescription,
        website: updatedWebsite,
        countries: updatedCountries,
        biotechCategories: updatedBiotechCategories,
        skillCategories: updatedSkillCategories,
        startDate: updatedStartDate,
        endDate: updatedEndDate,
      },
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
      organizer: skillOpt.organizer,  
      accountId: localStorage.getItem("userId"),  
    };

    this.props
      .updateSkillOpt(skillOpt.id, updatedSkillOpt)
      .then((response) => {
        console.log("Update response:", response);
        this.getSkillOptById(skillOpt.id);
        this.props.history.push("/skill-opportunities/update/" + skillOpt.id);
        alert("Opportunity updated successfully!");
      })
      .catch((error) => {
        console.log("Update response:", updatedSkillOpt);
        console.log(error);
        alert("Failed to update your opportunity. Please try again.");
      });
  };

  handleCountryChange = (selectedCountries) => {
    const updatedCountries = selectedCountries.map((country) => ({
      value: country.value,
      label: country.label,
    }));
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        countries: updatedCountries,
      },
    }));
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
        alert("Opportunity was deleted successfully!");
        this.props.history.push("/dashboard");
      })
      .catch((e) => {
        console.log(e);
        alert("Failed to delete your opportunity. Please try again.");
      });
  };

  render() {
    const { skillOpt, formData } = this.state;
    const {
      updatedTitle,
      updatedDescription,
      updatedStartDate,
      updatedEndDate,
      updatedWebsite,
      updatedCountries,
      updatedBiotechCategories,
      updatedSkillCategories,
    } = formData;

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
                              <div className={styles.value}>
                                {skillOpt.title}
                              </div>
                            </div>
                          </MDBCol>
                          <MDBCol md="6">
                            <div className={styles.inputWrapper}>
                              <label className={styles.label}>Website</label>
                              <div className={styles.value}>
                                {skillOpt.website}
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
                          <div className={styles.value}>
                            {skillOpt.description}
                          </div>
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
                    <InputField
                      label="Title"
                      id="title"
                      type="text"
                      name="title"
                      value={updatedTitle}
                      onChange={this.handleInputChange}
                    />
                    <InputField
                      label="Description"
                      id="description"
                      type="text"
                      name="description"
                      value={updatedDescription}
                      onChange={this.handleInputChange}
                    />
                    <InputField
                      label="Website"
                      id="website"
                      type="text"
                      name="website"
                      value={updatedWebsite}
                      onChange={this.handleInputChange}
                    />
                  
                    <InputField
                      label="Start Date"
                      id="startDate"
                      type="date"
                      name="startDate"
                      value={updatedStartDate}
                      onChange={this.handleInputChange}
                    />
                    <InputField
                      label="End Date"
                      id="endDate"
                      type="date"
                      name="endDate"
                      value={updatedEndDate}
                      onChange={this.handleInputChange}
                    />
                    <div className={`${styles.select} ${styles.textSelect}`}>
                      <SkillCategoriesSelect
                        value={updatedSkillCategories}
                        onChange={this.handleSkillCategoriesChange}
                      />
                      <BiotechCategoriesSelect
                        value={updatedBiotechCategories}
                        onChange={this.handleBiotechCategoriesChange}
                      />
                      <CountriesSelect
                        value={updatedCountries}
                        onChange={this.handleCountriesChange}
                      />
                    </div>
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol className={`${styles.textCenter} ${styles.buttons}`}>
                    <ButtonUpdate onClick={this.updateSkillOpt} />
                    <ButtonDelete onClick={this.deleteSkillOpt} />
                    <ButtonBack onClick={this.goBack} />
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
