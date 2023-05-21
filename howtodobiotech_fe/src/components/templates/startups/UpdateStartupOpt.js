import React, { Component } from "react";
import styles from "../common/UpdateOpt.module.css";
import { connect } from "react-redux";
import { updateStartupOpt, deleteStartupOpt } from "../../../actions/startups";

import StartupOptDataService from "../../../service/Startup.service";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";

import CountryLabel from "../../atoms/common/Country.label";
import CategoryLabel from "../../atoms/common/Category.label";
import ButtonUpdate from "../../atoms/common/ButtonUpdate";
import ButtonBack from "../../atoms/common/ButtonBack";
import ButtonDelete from "../../atoms/common/ButtonDelete";
import InputField from "../../atoms/common/InputField";
import CountriesSelect from "../../molecules/common/CountriesSelect";
import SupportCategoriesSelect from "../../molecules/startups/SupportCategoriesSelect";
import BiotechCategoriesSelect from "../../molecules/common/BiotechCategoriesSelect";

class StartupOptUpdateForm extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      startupOpt: null,
      formData: {
        title: "",
        description: "",
        startDate: "",
        endDate: "",
        website: "",
        countries: [],
        biotechCategories: [],
        supportCategories: [],
      },
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.getStartupOptById(id);
  }

  getStartupOptById(id) {
    StartupOptDataService.getStartupOptById(id)
      .then((response) => {
        this.setState({ startupOpt: response.data });
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
    const updatedCountries = selectedOptions.map((option) => ({
      value: option.value,
      label: option.label,
    }));

    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        countries: updatedCountries,
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

  handleSupportCategoriesChange = (selectedOptions) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        supportCategories: selectedOptions,
      },
    }));
  };

  updateStartupOpt = () => {
    const {
      startupOpt,
      formData: {
        title: updatedTitle,
        description: updatedDescription,
        website: updatedWebsite,
        countries: updatedCountries,
        biotechCategories: updatedBiotechCategories,
        supportCategories: updatedSupportCategories,
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

    const supportCategoryValues = updatedSupportCategories.map(
      (supportCategory) => ({
        id: supportCategory.value.id,
        name: supportCategory.value.name,
      })
    );

    const updatedStartupOpt = {
      id: startupOpt.id,
      title: updatedTitle,
      description: updatedDescription,
      website: updatedWebsite,
      countries: countryValues,
      biotechCategories: biotechCategoryValues,
      supportCategories: supportCategoryValues,
      startDate: updatedStartDate,
      endDate: updatedEndDate,
      provider: startupOpt.provider,
      accountId: localStorage.getItem("userId"),
    };

    this.props
      .updateStartupOpt(startupOpt.id, updatedStartupOpt)
      .then((response) => {
        console.log("Update response:", response);
        this.getStartupOptById(startupOpt.id);
        this.props.history.push(
          "/startup-opportunities/update/" + startupOpt.id
        );
        alert("Support was updated successfully!");
      })
      .catch((error) => {
        console.log("Update response:", updatedStartupOpt);
        console.log(error);
        alert("Failed to update your support opportunity. Please try again.");
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

  handleSupportCategoryChange = (selectedSupportCategory) => {
    const updatedSupportCategories = selectedSupportCategory.map(
      (supportCategory) => ({
        value: supportCategory.value,
        label: supportCategory.label,
      })
    );
    this.setState({ updatedSupportCategories });
  };

  goBack = () => {
    this.props.history.goBack();
  };

  deleteStartupOpt = () => {
    const { startupOpt } = this.state;
    this.props
      .deleteStartupOpt(startupOpt.id)
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
    const { startupOpt, formData } = this.state;
    const {
      updatedTitle,
      updatedDescription,
      updatedStartDate,
      updatedEndDate,
      updatedWebsite,
      updatedCountries,
      updatedBiotechCategories,
      updatedSupportCategories,
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
                    {startupOpt && (
                      <div>
                        <MDBRow>
                          <MDBCol md="6">
                            <div className={styles.inputWrapper}>
                              <label className={styles.label}>Title</label>
                              <div className={styles.value}>
                                {startupOpt.title}
                              </div>
                            </div>
                          </MDBCol>
                          <MDBCol md="6">
                            <div className={styles.inputWrapper}>
                              <label className={styles.label}>Website</label>
                              <div className={styles.value}>
                                {startupOpt.website}
                              </div>
                            </div>
                          </MDBCol>
                          <MDBCol md="6">
                            <div className={styles.inputWrapper}>
                              <label className={styles.label}>Start Date</label>
                              <div className={styles.dateValue}>
                                {startupOpt.startDate}
                              </div>
                            </div>
                          </MDBCol>
                          <MDBCol md="6">
                            <div className={styles.inputWrapper}>
                              <label className={styles.label}>End Date</label>
                              <div className={styles.dateValue}>
                                {startupOpt.endDate}
                              </div>
                            </div>
                          </MDBCol>
                        </MDBRow>
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Description</label>
                          <div className={styles.value}>
                            {startupOpt.description}
                          </div>
                        </div>

                        <MDBRow>
                          <MDBCol md="6">
                            <div className={styles.inputWrapper}>
                              <label className={styles.label}>Countries</label>
                              <div className={styles.value}>
                                {startupOpt.countries.map((country) => (
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
                                {startupOpt.biotechCategories.map(
                                  (category) => (
                                    <CategoryLabel
                                      key={category.id}
                                      category={category}
                                    />
                                  )
                                )}
                              </div>
                            </div>
                          </MDBCol>

                          <MDBCol md="6">
                            <div className={styles.inputWrapper}>
                              <label className={styles.label}>
                                Type of opportunity
                              </label>
                              <div className={styles.value}>
                                {startupOpt.supportCategories.map(
                                  (category) => (
                                    <CategoryLabel
                                      key={category.id}
                                      category={category}
                                    />
                                  )
                                )}
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
                      <SupportCategoriesSelect
                        value={updatedSupportCategories}
                        onChange={this.handleSupportCategoriesChange}
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
                    <ButtonUpdate onClick={this.updateStartupOpt} />
                    <ButtonDelete onClick={this.deleteStartupOpt} />
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

export default connect(mapStateToProps, { updateStartupOpt, deleteStartupOpt })(
  StartupOptUpdateForm
);
