import React, { Component } from "react";
import { connect } from "react-redux";
import { createStartupOpt } from "../../../actions/startups";
import StartupOptDataService from "../../../service/Startup.service";

import {
  MDBCardImage,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
} from "mdb-react-ui-kit";

import ButtonAdd from "../../atoms/common/ButtonAdd";
import ButtonBack from "../../atoms/common/ButtonBack";
import InputField from "../../atoms/common/InputField";
import CountriesSelect from "../../molecules/CountriesSelect";
import BiotechCategoriesSelect from "../../molecules/BiotechCategoriesSelect";
import SupportCategoriesSelect from "../../molecules/SupportCategoriesSelect";
import styles from "./AddStartupOpt.module.css";

class AddStartupOpt extends Component {
  constructor(props) {
    super(props);

    const userId = localStorage.getItem("userId");

    this.state = {
      formData: {
        title: "",
        provider: "",
        description: "",
        startDate: "",
        endDate: "",
        website: "",
        accountId: userId,
        countries: [],
        biotechCategories: [],
        supportCategories: []
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

  handleSupportCategoriesChange = (selectedOptions) => {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        supportCategories: selectedOptions,
      },
    }));
  };


  createStartupOpt = () => {
    const {
      title,
      provider,
      description,
      startDate,
      endDate,
      website,
      countries,
      biotechCategories,
      supportCategories,
    } = this.state.formData;

    const formattedStartDate = new Date(`${startDate}T00:00:00`);
    const formattedEndDate = new Date(`${endDate}T23:59:59`);

    
    const data = {
      title,
      provider,
      description,
      startDate: formattedStartDate.toISOString(),
      endDate: formattedEndDate.toISOString(),
      website,
      accountId: this.state.formData.accountId,
      countries: countries.map((country) => ({
        id: country.value.id,
        name: country.value.name,
      })),
      biotechCategories: biotechCategories.map((biotechCategory) => ({
        id: biotechCategory.value.id,
        name: biotechCategory.value.name,
      })),
      supportCategories: supportCategories.map((supportCategory) => ({
        id: supportCategory.value.id,
        name: supportCategory.value.name,
      })),
    };

    StartupOptDataService.createStartupOpt(data)
    .then((response) => {
      console.log(response);
      alert("Your support for scientific startups was  created successfully!");
      window.location.reload(); // Refresh the webpage
    })
    .catch((error) => {
      console.log(error);
      console.log(data);
      alert("Failed to create startup support. Please try again.");
    });
};

goBack = () => {
  this.props.history.goBack();
};

  render() {
    const {
      title,
      provider,
      description,
      startDate,
      endDate,
      website,
      countries,
      biotechCategories,
      supportCategories,
    } = this.state.formData;
   
      return (
        <MDBContainer fluid className={styles.container}>
          <MDBRow className={`${styles.row} d-flex justify-content-center align-items-center h-100`}>
            <MDBCol col="12" className={`${styles.column} m-5`}>
              <MDBCard className={`${styles.card} ${styles.cardAdd}`}>
                <MDBCardBody className={styles.cardBody}>
                  <MDBRow>
                    <MDBCol md="6" className={`${styles.textCenter} ${styles.bgIndigo} ${styles.card} `}>
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
                        label="Provider"
                        id="provider"
                        type="text"
                        name="provider"
                        value={provider}
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
    
                      <SupportCategoriesSelect
                        value={supportCategories}
                        onChange={this.handleSupportCategoriesChange}
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
                    <MDBCol md="6">
                      <div className={styles.text}>
                        <h4 className={`${styles.heading} ${styles.headingNormal} ${styles.textWhite} `}>
                          Add your support for   <br />
                          biotech startups to database!
                        </h4>
                        <p>
                          Incubators, accelerators, mentoring support, investments, or even awards can be
                          valuable experiences. You are giving young biotech startups the chance to grow.
                          Thank you!
                        </p>
                      </div>
                      <div className={`${styles.imageColumn}`}>
                        <MDBCardImage
                          src="/assets/add_startup.jpg"
                          alt="Form Image"
                          className={`${styles.image}`}
                        />
                      </div>
                      <MDBRow>
                        <MDBCol className={`${styles.textCenter} ${styles.buttons}`}>
                          <ButtonAdd onClick={this.createStartupOpt} />
                          <ButtonBack onClick={this.goBack} />
                        </MDBCol>
                      </MDBRow>
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
export default connect(null, { createStartupOpt })(AddStartupOpt);
