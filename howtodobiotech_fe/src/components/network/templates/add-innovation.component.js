import React, { Component } from "react";
import { connect } from "react-redux";
import { createInnovation } from "../../../actions/innovations";
import styles from "./AddInnovation.module.css";

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
    const { title, description, website, countries, categories, submitted } =
      this.state;

    return (
      <div className={styles.card}>
        <div className={styles["submit-form"]}>
          {submitted ? (
            <div>
              <h4>You submitted successfully!</h4>
              <button className="btn btn-success" onClick={this.newInnovation}>
                Add
              </button>
            </div>
          ) : (
            <div>
              <div>
                <h2>Add new</h2>
              </div>
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

              <button onClick={this.saveInnovation} className="btn btn-success">
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(null, { createInnovation })(AddInnovation);
