import React, { Component } from "react";
import styles from "./SkillOptAdd.module.css";
import { connect } from "react-redux";
import { createSkillOpt } from "../../../actions/skills";

import SkillOptDataService from "../../../service/Skill.service";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";
import InputField from "../../atoms/common/InputField";
import CountriesSelect from "../../molecules/CountriesSelect";
import SkillCategoriesSelect from "../../molecules/SkillCategoriesSelect";
import BiotechCategoriesSelect from "../../molecules/BiotechCategoriesSelect";


class SkillOptAddForm extends Component {
  constructor(props) {
    super(props);

    const userId = localStorage.getItem("userId");

    this.state = {
      formData: {
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
      },
    };
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




  

  createSkillOpt = () => {
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
    } = this.state.formData;

    const formattedStartDate = new Date(startDate).toISOString().split("T")[0];
    const formattedEndDate = new Date(endDate).toISOString().split("T")[0];

    const data = {
      title,
      organizer,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
      website,
      accountId: this.state.formData.accountId,
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
    } = this.state.formData;

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
                    <InputField
                      label="Title"
                      id="title"
                      type="text"
                      name="title"
                      value={title}
                      onChange={this.handleInputChange}
                    />
                    <InputField
                      label="Description"
                      id="description"
                      type="text"
                      name="description"
                      value={description}
                      onChange={this.handleInputChange}
                    />
                    <InputField
                      label="Website"
                      id="website"
                      type="text"
                      name="website"
                      value={website}
                      onChange={this.handleInputChange}
                    />
                    <InputField
                      label="Organizer"
                      id="organizer"
                      type="text"
                      name="organizer"
                      value={organizer}
                      onChange={this.handleInputChange}
                    />
                    <InputField
                      label="Start Date"
                      id="startDate"
                      type="date"
                      name="startDate"
                      value={startDate}
                      onChange={this.handleInputChange}
                    />
                    <InputField
                      label="End Date"
                      id="endDate"
                      type="date"
                      name="endDate"
                      value={endDate}
                      onChange={this.handleInputChange}
                    />
                   
                    <SkillCategoriesSelect
                      value={skillCategories}
                      onChange={this.handleSkillCategoriesChange}
                    />
                    <BiotechCategoriesSelect
                      value={biotechCategories}
                      onChange={this.handleBiotechCategoriesChange}
                    />
                    <CountriesSelect
                      value={countries}
                      onChange={this.handleCountriesChange}
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

export default connect(null, { createSkillOpt })(SkillOptAddForm);
