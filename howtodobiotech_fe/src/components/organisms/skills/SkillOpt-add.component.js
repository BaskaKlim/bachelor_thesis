import React, { Component } from "react";
import { connect } from "react-redux";
import { createSkillOpt } from "../../../actions/skills";

const biotechCategoryOptions = [
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
const skillCategoryOptions = [
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
    title:"SUMMER WINTER SCHOOL",
    imageUrl: "/assets/school.png",
    color: "#4B4DF7",
  },
  {
    id: 3,
    name: "CONFERENCE",
    title:"CONFERENCE",
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
  { id: 5, 
    name: "ACADEMY", 
    title: "ACADEMY", 
    imageUrl: "/assets/academy.png", 
    color: "#B23730" },
  {
    id: 6,
    name: "HACKATHON",
    title: "HACKATHON",
    imageUrl: "/assets/hackathon.png",
    color: "#9695F2",
  },
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
class AddSkillOpt extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      organizer: "",
      description: "",
      startDate: "",
      endDate: "",
      website: "",
      countries: [],
      biotechCategories: [],
      skillCategories: [],
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onChangeCountries = (e) => {
    const selectedCountries = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    this.setState({ countries: selectedCountries });
  };

  onChangeBiotechCategories = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    this.setState({ biotechCategories: selectedCategories });
  };

  onChangeSkillCategories = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) =>
      parseInt(option.value)
    );
    this.setState({ skillCategories: selectedCategories });
  };

  saveSkillOpt = () => {
    const {
      title,
      organizer,
      description,
      startDate,
      endDate,
      website,
      countries,
      biotechCategories,
      skillCategories,
    } = this.state;

    this.props
      .createSkillOpt({
        title,
        organizer,
        description,
        startDate,
        endDate,
        website,
        countries,
        biotechCategories,
        skillCategories,
      })
      .then(() => {
        console.log("Skill opportunity saved successfully");
        // Add any further actions you want to perform after saving
      })
      .catch((e) => {
        console.log("Error while saving skill opportunity:", e);
      });
  };

  render() {
    const {
      title,
      organizer,
      description,
      startDate,
      endDate,
      website,
      countries,
      biotechCategories,
      skillCategories,
    } = this.state;

    return (
      <div>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={this.onChange}
          />
        </div>
        <div>
          <label>Organizer:</label>
          <input
            type="text"
            name="organizer"
            value={organizer}
            onChange={this.onChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={this.onChange}
          ></textarea>
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={this.onChange}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={this.onChange}
          />
        </div>
        <div>
          <label>Website:</label>
          <input
            type="text"
            name="website"
            value={website}
            onChange={this.onChange}
          />
        </div>
        <div>
          <label>Countries:</label>
          <select
            multiple
            name="countries"
            value={countries}
            onChange={this.onChangeCountries}
          >
            {countryOptions.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Biotech Categories:</label>
          <select
            multiple
            name="biotechCategories"
            value={biotechCategories}
            onChange={this.onChangeBiotechCategories}
          >
            {biotechCategoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Skill Categories:</label>
          <select
            multiple
            name="skillCategories"
            value={skillCategories}
            onChange={this.onChangeSkillCategories}
          >
            {skillCategoryOptions.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button onClick={this.saveSkillOpt}>Save</button>
      </div>
    );
            }}
    export default connect(null, { createSkillOpt })(AddSkillOpt);