import React, { Component } from 'react';

class SearchFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategories: new Set(),
      selectedCountries: new Set(),
    };
  }

  toggleCategory(categoryId) {
    const { selectedCategories } = this.state;
    if (selectedCategories.has(categoryId)) {
      selectedCategories.delete(categoryId);
    } else {
      selectedCategories.add(categoryId);
    }
    this.setState({ selectedCategories }, this.filterInnovations);
  }

  toggleCountry(countryId) {
    const { selectedCountries } = this.state;
    if (selectedCountries.has(countryId)) {
      selectedCountries.delete(countryId);
    } else {
      selectedCountries.add(countryId);
    }
    this.setState({ selectedCountries }, this.filterInnovations);
  }

  filterInnovations() {
    const { innovations, onFilter } = this.props;
    const { selectedCategories, selectedCountries } = this.state;

    const filteredInnovations = innovations.filter(
      (innovation) =>
        (selectedCategories.size === 0 ||
          selectedCategories.has(innovation.category.id)) &&
        (selectedCountries.size === 0 ||
          selectedCountries.has(innovation.country.id))
    );

    onFilter(filteredInnovations);
  }

  render() {
    const { categories, countries } = this.props;

    return (
      <div>
        <h4>Filter by Category</h4>
        {categories.map((category) => (
          <label
            key={category.id}
            onClick={() => this.toggleCategory(category.id)}
          >
            {category.name}
          </label>
        ))}

        <h4>Filter by Country</h4>
        {countries.map((country) => (
          <label
            key={country.id}
            onClick={() => this.toggleCountry(country.id)}
          >
            {country.name}
          </label>
        ))}
      </div>
    );
  }
}

export default SearchFilter;
