import React, { Component } from "react";
import { connect } from "react-redux";
import { createStartupOpt } from "../../../actions/startups";
import styles from "./AddStartupOpt.module.css";

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

const supportOptions = [
  { id: 1, name: "INCUBATOR" },
  { id: 2, name: "ACCELERATOR" },
  { id: 3, name: "INVESTMENT" },
  { id: 4, name: "MENTORING" },
  { id: 5, name: "AWARDS" },
];

class AddStartupOpt extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeProvider = this.onChangeProvider.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.onChangeWebsite = this.onChangeWebsite.bind(this);
    this.onChangeCountries = this.onChangeCountries.bind(this);
    this.onChangeCategories = this.onChangeCategories.bind(this);
    this.onChangeSupportCategories = this.onChangeSupportCategories.bind(this);
    this.saveStartupOpt = this.saveStartupOpt.bind(this);
    this.newStartupOpt = this.newStartupOpt.bind(this);

    this.state = {
      id: null,
      title: "",
      provider: "",
      description: "",
      startDate: "",
      endDate: "",
      website: "",
      countries: new Set(),
      categories: new Set(),
      supportCategories: new Set(),
      submitted: false,
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeProvider(e) {
    this.setState({
      provider: e.target.value,
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeStartDate(event) {
    this.setState({
      startDate: event.target.value,
    });
  }

  onChangeEndDate(event) {
    this.setState({
      endDate: event.target.value,
    });
  }

  onChangeWebsite(e) {
    this.setState({
      website: e.target.value,
    });
  }

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

  onChangeSupportCategories = (e) => {
    const selectedSupportOptionIds = Array.from(
      e.target.selectedOptions,
      (option) => parseInt(option.value)
    );
    const supportCategories = new Set(
      selectedSupportOptionIds.map((id) =>
        supportOptions.find((supportCategory) => supportCategory.id === id)
      )
    );
    this.setState({
      supportCategories: supportCategories,
    });
  };

  saveStartupOpt = () => {
    const {
      title,
      provider,
      description,
      startDate,
      endDate,
      website,
      countries,
      categories,
      supportCategories,
    } = this.state;

    console.log('Saving startup opt with the following data:', {
      title,
      provider,
      description,
      startDate,
      endDate,
      website,
      countries: Array.from(countries),
      categories: Array.from(categories),
      supportCategories: Array.from(supportCategories),
    });


    this.props
      .createStartupOpt(
        title,
        provider,
        description,
        startDate,
        endDate,
        website,
        Array.from(countries),
        Array.from(categories),
        Array.from(supportCategories)
      )
      .then(() => {
        console.log('Startup opt saved successfully');
        this.setState({
          submitted: true,
        });
      })
      .catch((e) => {
        console.log('Error while saving startup opt:', e);
      });
  };


  newStartupOpt = () => {
    console.log('Resetting form for a new startup opt');
    this.setState({
      title: "",
      provider: "",
      description: "",
      startDate: "",
      endDate: "",
      website: "",
      countries: new Set(),
      categories: new Set(),
      supportCategories: new Set(),
      submitted: false,
    });
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
      categories,
      supportCategories,
      submitted,
    } = this.state;

    return (
      <div className={styles.card}>
        <div className={styles["submit-form"]}>
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newStartupOpt}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div className={styles["form-group"]}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  required
                  value={title}
                  onChange={this.onChangeTitle}
                  name="title"
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="provider">Provider</label>
                <input
                  type="text"
                  className="form-control"
                  id="provider"
                  required
                  value={provider}
                  onChange={this.onChangeProvider}
                  name="provider"
                />
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  id="description"
                  required
                  value={description}
                  onChange={this.onChangeDescription}
                  name="description"
                />
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="startDate">Start Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  required
                  value={startDate}
                  onChange={this.onChangeStartDate}
                  name="startDate"
                />
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="endDate">End Date</label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  required
                  value={endDate}
                  onChange={this.onChangeEndDate}
                  name="endDate"
                />
              </div>
              <div className={styles["form-group"]}>
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  className="form-control"
                  id="website"
                  required
                  value={website}
                  onChange={this.onChangeWebsite}
                  name="website"
                />
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="countries">Countries</label>
                <select
                  multiple
                  className="form-control"
                  id="countries"
                  value={[...countries].map((country) => country.id)}
                  onChange={this.onChangeCountries}
                  name="countries"
                >
                  {countryOptions.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="categories">Categories</label>
                <select
                  multiple
                  className="form-control"
                  id="categories"
                  value={[...categories].map((category) => category.id)}
                  onChange={this.onChangeCategories}
                  name="categories"
                >
                  {categoryOptions.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles["form-group"]}>
                <label htmlFor="supportCategories">Support Options</label>
                <select
                  multiple
                  className="form-control"
                  id="supportCategories"
                  value={[...supportCategories].map(
                    (supportCategory) => supportCategory.id
                  )}
                  onChange={this.onChangeSupportCategories}
                  name="supportCategories"
                >
                  {supportOptions.map((supportCategory) => (
                    <option key={supportCategory.id} value={supportCategory.id}>
                      {supportCategory.name}
                    </option>
                  ))}
                </select>
              </div>

              <button onClick={this.saveStartupOpt} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default connect(null, { createStartupOpt })(AddStartupOpt);
