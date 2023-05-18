import React, { Component } from "react";
import { connect } from "react-redux";
import { createSkillOpt } from "../../../actions/skills";

import Select from "react-select";
import SkillOptDataService from "../../../service/Skill.service";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
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

class SkillOptAdd extends Component {
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
      description,
      startDate,
      endDate,
      organizer,
      website,
      countries,
      biotechCategories,
      skillCategories,
    } = this.state;

    const data = {
      title,
      description,
      startDate,
      endDate,
      organizer,
      website,
      countries,
      biotechCategories,
      skillCategories,
    };

    SkillOptDataService.createSkillOpt(data)
    .then((response) => {
      // Spracovanie úspešného vytvorenia SkillOpt
      console.log("SkillOpt created:", response);
      // Prípadne môžete vykonať nejaké ďalšie akcie alebo aktualizovať komponent
    })
    .catch((error) => {
      // Spracovanie chyby pri vytváraní SkillOpt
      console.log("Error creating SkillOpt:", error);
      console.log(data);
    });
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
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
                <form>
                  <MDBInput
                    label="Title"
                    type="text"
                    name="title"
                    value={title}
                    onChange={this.handleInputChange}
                  />
                  <MDBInput
                    label="Description"
                    type="text"
                    name="description"
                    value={description}
                    onChange={this.handleInputChange}
                  />
                  <MDBInput
                    label="Start Date"
                    type="date"
                    name="startDate"
                    value={startDate}
                    onChange={this.handleInputChange}
                  />
                  <MDBInput
                    label="End Date"
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={this.handleInputChange}
                  />
                  <MDBInput
                    label="Organizer"
                    type="text"
                    name="organizer"
                    value={organizer}
                    onChange={this.handleInputChange}
                  />
                  <MDBInput
                    label="Website"
                    type="text"
                    name="website"
                    value={website}
                    onChange={this.handleInputChange}
                  />
                  <Select
                    options={categoryOptions.map((category) => ({
                      value: category,
                      label: category.name,
                      key: `category-${category.id}`,
                    }))}
                    isMulti
                    onChange={this.handleBiotechCategoriesChange}
                    value={biotechCategories}
                    placeholder="Select Biotech Categories"
                  />
                  <Select
                    options={countryOptions.map((country) => ({
                      value: country,
                      label: country.name,
                      key: `country-${country.id}`,
                    }))}
                    isMulti
                    onChange={this.handleCountriesChange}
                    value={countries}
                    placeholder="Select Countries"
                  />
                  <Select
                    options={categoryOptions.map((category) => ({
                      value: category,
                      label: category.name,
                      key: `category-${category.id}`,
                    }))}
                    isMulti
                    onChange={this.handleSkillCategoriesChange}
                    value={skillCategories}
                    placeholder="Select Skill Categories"
                  />
                  <MDBBtn color="primary" onClick={this.createSkillOpt}>
                    Add SkillOpt
                  </MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default connect(null, { createSkillOpt })(SkillOptAdd);
