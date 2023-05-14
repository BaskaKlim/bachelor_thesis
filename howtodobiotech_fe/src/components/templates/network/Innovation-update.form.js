import React, { Component } from "react";
import styles from "./InnovationUpdate.module.css";
import { connect } from "react-redux";
import {
  updateInnovation,
  deleteInnovation,
} from "../../../actions/innovations";
import Select from "react-select";

import InnovationDataService from "../../../service/innovation.service";
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

class InnovationUpdateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      innovation: null,
      updatedTitle: "",
      updatedDescription: "",
      updatedWebsite: "",
      updatedCountries: [],
      updatedCategories: [],
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getInnovationById(id);
  }

  getInnovationById(id) {
    InnovationDataService.getInnovationById(id)
      .then((response) => {
        this.setState({ innovation: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
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


  goBack = () => {
    this.props.history.goBack();
  };
  updateInnovation = () => {
    const {
      innovation,
      updatedTitle,
      updatedDescription,
      updatedWebsite,
      updatedCountries,
      updatedCategories,
    } = this.state;
  
    const countryValues = updatedCountries.map((country) => ({
      id: country.value.id,
      name: country.value.name,
    }));
  
    const categoryValues = updatedCategories.map((category) => ({
      id: category.value.id,
      name: category.value.name,
    }));
  
    const updatedInnovation = {
      id: innovation.id,
      title: updatedTitle,
      description: updatedDescription,
      website: updatedWebsite,
      countries: countryValues,
      categories: categoryValues,
    };
  
    this.props
      .updateInnovation(innovation.id, updatedInnovation)
      .then((response) => {
        console.log("Update response:", response);
        // Fetch the updated innovation data
        this.getInnovationById(innovation.id);
        this.props.history.push("/innovations/update/" + innovation.id);
      })
      .catch((e) => {
        console.log("Update response:", updatedInnovation);
        console.log(e);
      });
  };
  
  deleteInnovation = () => {
    const { innovation } = this.state;
    this.props
      .deleteInnovation(innovation.id)
      .then(() => {
        this.props.history.push("/innovations");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  render() {
    const {
      innovation,
      updatedTitle,
      updatedDescription,
      updatedWebsite,
      updatedCountries,
      updatedCategories,
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
                    {innovation && (
                      <div>
                        <h3 className={styles.heading}>
                          Published Information
                        </h3>
                        <MDBRow>
                          <MDBCol md="6">
                            <div className={styles.inputWrapper}>
                              <label className={styles.label}>Title</label>
                              <div className={styles.value}>
                                {innovation.title}
                              </div>
                            </div>
                          </MDBCol>
                          <MDBCol md="6">
                            <div className={styles.inputWrapper}>
                              <label className={styles.label}>Website</label>
                              <div className={styles.value}>
                                {innovation.website}
                              </div>
                            </div>
                          </MDBCol>
                        </MDBRow>
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Description</label>
                          <div className={styles.value}>
                            {innovation.description}
                          </div>
                        </div>

                        <MDBRow>
                          <MDBCol md="6">
                            <div className={styles.inputWrapper}>
                              <label className={styles.label}>Countries</label>
                              <div className={styles.value}>
                                {innovation.countries
                                  .map((country) => country.name)
                                  .join(", ")}
                              </div>
                            </div>
                          </MDBCol>
                          <MDBCol md="6">
                            <div className={styles.inputWrapper}>
                              <label className={styles.label}>Categories</label>
                              <div className={styles.value}>
                                {innovation.categories
                                  .map((category) => category.name)
                                  .join(", ")}
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
                      type="text"
                      value={updatedTitle}
                      onChange={this.handleInputChange}
                    />
                    <MDBInput
                      wrapperClass={styles.inputWrapper}
                      label="Description"
                      size="lg"
                      id="updatedDescription"
                      type="text"
                      value={updatedDescription}
                      onChange={this.handleInputChange}
                    />
                    <MDBInput
                      wrapperClass={styles.inputWrapper}
                      label="Website"
                      size="lg"
                      id="updatedWebsite"
                      type="text"
                      value={updatedWebsite}
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
                      onChange={this.handleCategoryChange}
                      value={updatedCategories}
                    />

                    <Select
                      className={`${styles.select} ${styles.textSelect}`}
                      options={countryOptions.map((country) => ({
                        value: country,
                        label: country.name,

                        key: `country-${country.id}`,
                      }))}
                      isMulti
                      onChange={this.handleCountryChange}
                      value={updatedCountries}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol className={`${styles.textCenter} ${styles.buttons}`}>
                    <MDBBtn
                      className={styles.btnUpdate}
                      onClick={this.updateInnovation}
                    >
                      Update
                    </MDBBtn>
                    
                    <MDBBtn
                      className={styles.btnDelete}
                      onClick={this.deleteInnovation}
                    >
                      Delete
                    </MDBBtn>
                    <MDBBtn onClick={this.goBack} className={styles.btnBack}>
                  Back
                </MDBBtn>
                   
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

export default connect(mapStateToProps, {
  updateInnovation,
  deleteInnovation,
})(InnovationUpdateForm);
