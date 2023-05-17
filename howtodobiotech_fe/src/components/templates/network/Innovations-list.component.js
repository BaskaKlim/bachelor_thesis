import React, { Component } from "react";
import { connect } from "react-redux";
import {
  updateInnovation,
  deleteInnovation,
} from "../../../actions/innovations";
import InnovationDataService from "../../../service/innovation.service";
import Card from "../../organisms/network/Innovation.card";
import styles from "./InnovationsList.module.css"; // Import the new CSS module
import NotFoundPage from "../../organisms/common/NotFoundPage.component";

const categoryOptions = [
  {
    id: 1,
    name: "MEDICINE",
    imageUrl: "/assets/medicine.jpg",
    color: "#E35149",
  },
  {
    id: 2,
    name: "BIOINFORMATICS",
    imageUrl: "/assets/bioinformatics.jpg",
    color: "#110777",
  },
  { id: 3, name: "ENERGY", imageUrl: "/assets/energy.jpg", color: "#7369ff" },
  { id: 4, name: "FOOD", imageUrl: "/assets/food.jpg", color: "#FF928F" },
  {
    id: 5,
    name: "ENVIRONMENTAL",
    imageUrl: "/assets/environmental.jpg",
    color: "#91B3FA",
  },
  {
    id: 6,
    name: "AGRICULTURE",
    imageUrl: "/assets/agriculture.jpg",
    color: "#A22B25",
  },
  { id: 7, name: "MARINE", imageUrl: "/assets/marine.jpg", color: "#4B4DF7" },
];
class InnovationsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      innovations: [],
      filteredInnovations: [],
      currentPage: 1,
      innovationsPerPage: 3,
    };
  }

  filterByCategory = (categoryId) => {
    const filteredInnovations = this.state.innovations.filter((innovation) =>
      innovation.categories.some((category) => category.id === categoryId)
    );
    this.setState({ filteredInnovations });
  };

  showAllInnovations = () => {
    this.setState({ filteredInnovations: this.state.innovations });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  componentDidMount() {
    InnovationDataService.getAllInnovations()
      .then((response) => {
        const innovations = response.data;
        this.setState({ innovations, filteredInnovations: innovations });
      })
      .catch((error) => {
        console.log(error);
      });

    InnovationDataService.getAllCategories()
      .then((response) => {
        this.setState({ categories: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    InnovationDataService.getAllCountries()
      .then((response) => {
        this.setState({ countries: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.filteredInnovations !== prevProps.filteredInnovations) {
      this.setState({ filteredInnovations: this.props.filteredInnovations });
    }
  }

  render() {
    const { filteredInnovations, currentPage, innovationsPerPage } = this.state;
    const totalPages = Math.ceil(
      filteredInnovations.length / innovationsPerPage
    );
    const startIndex = (currentPage - 1) * innovationsPerPage;
    const endIndex = startIndex + innovationsPerPage;
    const displayedInnovations = filteredInnovations.slice(
      startIndex,
      endIndex
    );

    return (
      <div>
        <div>
          <button
            className={styles["all-categories-button"]}
            onClick={this.showAllInnovations}
          >
            All Categories
          </button>
          {categoryOptions.map((category) => (
            <button
              key={category.id}
              onClick={() => this.filterByCategory(category.id)}
              style={{ backgroundColor: category.color }}
              className={styles["category-button"]}
            >
              {category.name}
            </button>
          ))}
        </div>

        {displayedInnovations.length > 0 ? (
          <ul className={styles["cards-list"]}>
            {displayedInnovations.map((innovation) => {
              const firstCategory = innovation.categories[0];
              const category = categoryOptions.find(
                (cat) => cat.id === firstCategory.id
              );

              return (
                <li
                  key={innovation.id}
                  className={`${styles["card-container"]} ${styles["list-item"]}`}
                >
                  {category && (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className={styles["category-image"]}
                    />
                  )}
                  <Card innovation={innovation} />
                </li>
              );
            })}
            <div className={styles.pagination}>
              <div className={styles.paginationButtons}>
                {[...Array(totalPages)].map((_, number) => {
                  return (
                    <button
                      key={number}
                      onClick={() => this.handlePageChange(number + 1)}
                      className={`${styles.pageButton} ${
                        currentPage === number + 1 ? styles.active : ""
                      }`}
                    >
                      {number + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </ul>
        ) : (
          <NotFoundPage
            title="Did not find what you were looking for?"
            text="Help us build the biggest database of biotech innovations in our region. Let us know about interesting teams of scientists or startups you know."
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  innovations: state.innovations,
});

export default connect(mapStateToProps, { updateInnovation, deleteInnovation })(
  InnovationsList
);
