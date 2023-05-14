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
    this.setState({ updatedCountries: selectedCountries });
  };

  handleCategoryChange = (selectedCategories) => {
    this.setState({ updatedCategories: selectedCategories });
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

    const updatedInnovation = {
      id: innovation.id,
      title: updatedTitle,
      description: updatedDescription,
      website: updatedWebsite,
      countries: updatedCountries.map((country) => ({
        id: country.value,
        name: country.label,
      })),
      categories: updatedCategories.map((category) => ({
        id: category.value,
        name: category.label,
      })),
    };

    this.props
      .updateInnovation(innovation.id, updatedInnovation)
      .then((response) => {
        console.log("Update response:", updatedInnovation);
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
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center h-100">
          <MDBCol col="12" className="m-5">
            <MDBCard
              className="card-registration card-registration-2"
              style={{ borderRadius: "15px" }}
            >
              <MDBCardBody className="p-0">
                <MDBRow>
                  <MDBCol md="6">
                    {innovation && (
                      <div>
                        <h3
                          className="fw-normal mb-5"
                          style={{ color: "#4835d4" }}
                        >
                          General Information
                        </h3>
                        <MDBRow>
                          <MDBCol md="6">
                            <MDBInput
                              wrapperClass="mb-4"
                              label="Title"
                              size="lg"
                              id="form1"
                              type="text"
                              value={innovation.title}
                              disabled
                            />
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBInput
                              wrapperClass="mb-4"
                              label="Description"
                              size="lg"
                              id="form2"
                              type="text"
                              value={innovation.description}
                              disabled
                            />
                          </MDBCol>
                        </MDBRow>
                        <MDBInput
                          wrapperClass="mb-4"
                          label="Website"
                          size="lg"
                          id="form3"
                          type="text"
                          value={innovation.website}
                          disabled
                        />
                        <MDBRow>
                          <MDBCol md="6">
                            <MDBInput
                              wrapperClass="mb-4"
                              label="Countries"
                              size="lg"
                              id="form4"
                              type="text"
                              value={innovation.countries
                                .map((country) => country.name)
                                .join(", ")}
                              disabled
                            />
                          </MDBCol>
                          <MDBCol md="6">
                            <MDBInput
                              wrapperClass="mb-4"
                              label="Categories"
                              size="lg"
                              id="form5"
                              type="text"
                              value={innovation.categories
                                .map((category) => category.name)
                                .join(", ")}
                              disabled
                            />
                          </MDBCol>
                        </MDBRow>
                      </div>
                    )}
                  </MDBCol>

                  <MDBCol md="6">
                    <h3
                      className="fw-normal mb-5 text-white"
                      style={{ color: "#4835d4" }}
                    >
                      General Information
                    </h3>
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Title"
                      size="lg"
                      id="updatedTitle"
                      type="text"
                      value={updatedTitle}
                      onChange={this.handleInputChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Description"
                      size="lg"
                      id="updatedDescription"
                      type="text"
                      value={updatedDescription}
                      onChange={this.handleInputChange}
                    />
                    <MDBInput
                      wrapperClass="mb-4"
                      label="Website"
                      size="lg"
                      id="updatedWebsite"
                      type="text"
                      value={updatedWebsite}
                      onChange={this.handleInputChange}
                    />
                    <Select
                      className="mb-4"
                      options={categoryOptions.map((category) => ({
                        value: category.id,
                        label: category.name,
                      }))}
                      isMulti
                      onChange={this.handleCategoryChange}
                      value={updatedCategories.map((category) => ({
                        id: category.id,
                        name: category.name,
                      }))}
                    />

                    <Select
                      className="mb-4"
                      options={countryOptions.map((country) => ({
                        value: country.id,
                        label: country.name,
                      }))}
                      isMulti
                      onChange={this.handleCountryChange}
                      value={updatedCountries.map((country) => ({
                        id: country.id,
                        name: country.name,
                      }))}
                    />
                  </MDBCol>
                </MDBRow>
                <MDBRow>
                  <MDBCol className="text-center mt-4">
                    <MDBBtn color="warning" onClick={this.updateInnovation}>
                      Update
                    </MDBBtn>
                    <MDBBtn color="danger" onClick={this.deleteInnovation}>
                      Delete
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
