import React, { Component } from "react";
import { connect } from "react-redux";
import { createInnovation } from "../../../actions/innovations";
import styles from "./InnovationAdd.module.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBDropdown,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const categoryOptions = [
  { id: 1, name: "MEDICINE", imageUrl: "../../public/assets/medicine.jpg" },
  {
    id: 2,
    name: "BIOINFORMATICS",
    imageUrl: "../../publicassets/bioinformatics.jpg",
  },
  { id: 3, name: "ENERGY", imageUrl: "../../publicassets/energy.jpg" },
  { id: 4, name: "FOOD", imageUrl: "../../publicassets/food.jpg" },
  {
    id: 5,
    name: "ENVIRONMENTAL",
    imageUrl: "../../public/assets/environmental.jpg",
  },
  {
    id: 6,
    name: "AGRICULTURE",
    imageUrl: "../../public/assets/agriculture.jpg",
  },
  { id: 7, name: "MARINE", imageUrl: "../../public/assets/marine.jpg" },
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

class AddInnovation extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onChangeCountries = this.onChangeCountries.bind(this);
    this.onChangeCategories = this.onChangeCategories.bind(this);
    this.saveInnovation = this.saveInnovation.bind(this);
    this.newInnovation = this.newInnovation.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "",
      website: "",
      countries: new Set(),
      categories: new Set(),
      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeWebsite(e) {
    this.setState({
      website: e.target.value,
    });
  }

  onChangeCountries = (e) => {
    const selectedCountryIds = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    const countries = new Set(
      selectedCountryIds.map((id) =>
        countryOptions.find((country) => country.id === id)
      )
    );
    this.setState({
      countries: countries,
    });
  };

  onChangeCategories = (e) => {
    const selectedCategoryIds = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    const categories = new Set(
      selectedCategoryIds.map((id) =>
        categoryOptions.find((category) => category.id === id)
      )
    );
    this.setState({
      categories: categories,
    });
  };

  saveInnovation = () => {
    const { title, description, website, countries, categories } = this.state;

    this.props
      .createInnovation(
        title,
        description,
        website,
        Array.from(countries),
        Array.from(categories)
      )
      .then(() => {
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  newInnovation = () => {
    this.setState({
      title: "",
      description: "",
      website: "",
      countries: new Set(),
      categories: new Set(),
      submitted: false,
    });
  };

  render() {
    const { innovation } = this.state;

    return (
      <div>
        <MDBContainer fluid className="h-custom">
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12" className="m-5">
              <MDBCard
                className="card-registration card-registration-2"
                style={{ borderRadius: "15px" }}
              >
                <MDBCardBody className="p-0">
                  <MDBRow>
                    <MDBCol md="6" className="p-5 bg-white">
                      <h3
                        className="fw-normal mb-5"
                        style={{ color: "#4835d4" }}
                      >
                        General Infomation
                      </h3>
                      <MDBDropdown
                        className="mb-4"
                        size="lg"
                        data={[
                          { text: "Titile", value: 1 },
                          { text: "Two", value: 2 },
                          { text: "Three", value: 3 },
                          { text: "Four", value: 4 },
                        ]}
                      />

                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass="mb-4"
                            label="First Name"
                            size="lg"
                            id="form1"
                            type="text"
                          />
                        </MDBCol>

                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass="mb-4"
                            label="Last Name"
                            size="lg"
                            id="form2"
                            type="text"
                          />
                        </MDBCol>
                      </MDBRow>

                      <MDBDropdown
                        className="mb-4"
                        size="lg"
                        data={[
                          { text: "Position", value: 1 },
                          { text: "Two", value: 2 },
                          { text: "Three", value: 3 },
                          { text: "Four", value: 4 },
                        ]}
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Position"
                        size="lg"
                        id="form3"
                        type="text"
                      />

                      <MDBRow>
                        <MDBCol md="6">
                          <MDBInput
                            wrapperClass="mb-4"
                            label="Bussines Arena"
                            size="lg"
                            id="form4"
                            type="text"
                          />
                        </MDBCol>

                        <MDBCol md="6">
                          <MDBDropdown
                            className="mb-4"
                            size="lg"
                            data={[
                              { text: "Employees", value: 1 },
                              { text: "Two", value: 2 },
                              { text: "Three", value: 3 },
                              { text: "Four", value: 4 },
                            ]}
                          />
                        </MDBCol>
                      </MDBRow>
                    </MDBCol>

                    <MDBCol md="6" className="bg-indigo p-5">
                      <h3
                        className="fw-normal mb-5 text-white"
                        style={{ color: "#4835d4" }}
                      >
                        Contact Details
                      </h3>
                      <MDBInput
                        wrapperClass="mb-4"
                        labelClass="text-white"
                        label="Street + Nr"
                        size="lg"
                        id="form5"
                        type="text"
                      />
                      <MDBInput
                        wrapperClass="mb-4"
                        labelClass="text-white"
                        label="Additional Information"
                        size="lg"
                        id="form6"
                        type="text"
                      />

                      <MDBRow>
                        <MDBCol md="5">
                          <MDBInput
                            wrapperClass="mb-4"
                            labelClass="text-white"
                            label="Zip Code"
                            size="lg"
                            id="form6"
                            type="text"
                          />
                        </MDBCol>

                        <MDBCol md="7">
                          <MDBInput
                            wrapperClass="mb-4"
                            labelClass="text-white"
                            label="Place"
                            size="lg"
                            id="form7"
                            type="text"
                          />
                        </MDBCol>
                      </MDBRow>

                      <MDBInput
                        wrapperClass="mb-4"
                        labelClass="text-white"
                        label="Country"
                        size="lg"
                        id="form8"
                        type="text"
                      />

                      <MDBRow>
                        <MDBCol md="5">
                          <MDBInput
                            wrapperClass="mb-4"
                            labelClass="text-white"
                            label="Code +"
                            size="lg"
                            id="form9"
                            type="text"
                          />
                        </MDBCol>

                        <MDBCol md="7">
                          <MDBInput
                            wrapperClass="mb-4"
                            labelClass="text-white"
                            label="Phone Number"
                            size="lg"
                            id="form10"
                            type="text"
                          />
                        </MDBCol>
                      </MDBRow>

                      <MDBInput
                        wrapperClass="mb-4"
                        labelClass="text-white"
                        label="Your Email"
                        size="lg"
                        id="form8"
                        type="email"
                      />
                      <MDBCheckbox
                        name="flexCheck"
                        id="flexCheckDefault"
                        labelClass="text-white mb-4"
                        label="I do accept the Terms and Conditions of your site."
                      />
                      <MDBBtn color="light" size="lg">
                        Register
                      </MDBBtn>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>

        <MDBContainer>
          <div>
            {innovation ? (
              <div>
                <h4>Innovation</h4>
                <p>
                  <strong>Title:</strong> {innovation.title}
                </p>
                <p>
                  <strong>Description:</strong> {innovation.description}
                </p>
                <p>
                  <strong>Website:</strong> {innovation.website}
                </p>
                <p>
                  <strong>Countries:</strong>{" "}
                  {innovation.countries
                    .map((country) => country.name)
                    .join(", ")}
                </p>
                <p>
                  <strong>Categories:</strong>{" "}
                  {innovation.categories
                    .map((category) => category.name)
                    .join(", ")}
                </p>

                <button
                  onClick={this.updateInnovation}
                  className="btn btn-warning"
                >
                  Update
                </button>
                <button
                  onClick={this.deleteInnovation}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </MDBContainer>
      </div>
    );
  }
}

export default connect(null, { createInnovation })(AddInnovation);
