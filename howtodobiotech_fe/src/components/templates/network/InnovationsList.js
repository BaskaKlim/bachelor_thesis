import React, { Component } from "react";
import { connect } from "react-redux";
import InnovationDataService from "../../../service/innovation.service";
import Card from "../../organisms/network/InnovationCard";
import styles from "../common/OptsList.module.css";
import NotFoundPage from "../../organisms/common/NotFoundPage.component";
import BiotechCategoryOptions from "../../molecules/BiotechCategoryOptions";
import Pagination from "../../molecules/Pagination";

class InnovationsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      innovations: [],
      filteredInnovations: [],
      currentPage: 1,
      innovationsPerPage: 3,
      selectedCategory: null,
      isFilterOpen: false,
    };
  }

  handlePageClick = (event) => {
    this.setState(
      { currentPage: Number(event.target.id) },
      this.filterInnovations
    );
  };

  handlePrevPage = () => {
    this.setState(
      (prevState) => ({
        currentPage: prevState.currentPage - 1,
      }),
      this.filterInnovations
    );
  };

  handleNextPage = () => {
    this.setState(
      (prevState) => ({
        currentPage: prevState.currentPage + 1,
      }),
      this.filterInnovations
    );
  };

  handleCategoryFilter = (categoryId) => {
    this.setState(
      { selectedCategory: categoryId, currentPage: 1 },
      this.filterInnovations
    );
  };

  toggleFilter = () => {
    this.setState((prevState) => ({
      isFilterOpen: !prevState.isFilterOpen,
    }));
  };

  filterInnovations = () => {
    const { selectedCategory, innovations } = this.state;
  
    let filteredInnovations = innovations;
    if (selectedCategory) {
      filteredInnovations = innovations.filter((innovation) =>
        innovation.categories.some((category) => category.id === selectedCategory)
      );
    }
  
    this.setState({ filteredInnovations });
  };
  
  showAllInnovations = () => {
    this.setState(
      {
        selectedCategory: null,
        currentPage: 1,
      },
      this.filterInnovations
    );
  };

  componentDidMount() {
    InnovationDataService.getAllInnovations()
      .then((response) => {
        const innovations = response.data;
        console.log("Fetched innovations:", innovations); // Check the response data
        this.setState(
          { innovations, filteredInnovations: innovations },
          this.filterInnovations
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }  
  
  

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedCategory !== this.state.selectedCategory) {
      this.filterInnovations();
    }
  }

  render() {
    const {
      filteredInnovations,
      currentPage,
      innovationsPerPage,
      isFilterOpen,
      innovations,
    } = this.state;
    const totalPages = Math.ceil(filteredInnovations.length / innovationsPerPage);
    const startIndex = (currentPage - 1) * innovationsPerPage;
    const endIndex = startIndex + innovationsPerPage;
    const displayedInnovations = filteredInnovations.slice(startIndex, endIndex);
  
    console.log("innovations:", innovations);
    console.log("filteredInnovations:", filteredInnovations);
    console.log("displayedInnovations:", displayedInnovations);
    
    return (
      <div className={styles.container}>
        <div className={styles.filterOptions}>
          <div className={styles.controlButtons}>
            <button
              className={`${styles["all-categories-button"]} ${styles.allButton}`}
              onClick={this.showAllInnovations}
            >
              All Categories
            </button>
            <button
              className={`${styles["filter-button"]} ${styles.filterButton}`}
              onClick={this.toggleFilter}
            >
              Choose Biotech Field
            </button>
          </div>
          {isFilterOpen && (
            <BiotechCategoryOptions
              selectedCategory={this.state.selectedCategory}
              handleCategoryFilter={this.handleCategoryFilter}
            />
          )}
        </div>
  
        {displayedInnovations.length > 0 ? (
          <div className={styles.listContainer}>
            <ul className={styles["cards-list"]}>
              {displayedInnovations.map((innovation) => (
                <li key={innovation.id} className={styles["list-item"]}>
                  <Card innovation={innovation} />
                </li>
              ))}
            </ul>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageClick={this.handlePageClick}
            />
          </div>
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

export default connect(mapStateToProps)(InnovationsList);
