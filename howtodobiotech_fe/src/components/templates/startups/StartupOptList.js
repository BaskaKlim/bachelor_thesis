import React, { Component } from "react";
import { connect } from "react-redux";
import StartupOptDataService from "../../../service/Startup.service";
import Card from "../../organisms/startups/StartupCard";
import styles from "../common/OptsList.module.css";
import NotFoundPage from "../../organisms/common/NotFoundPage.component";
import Pagination from "../../molecules/common/Pagination";
import SupportCategoryOptions from "../../molecules/startups/SupportCategoryOptions";
import CountryOptions from "../../molecules/common/CountryOptions";
import BiotechCategoryOptions from "../../molecules/common/BiotechCategoryOptions";

class StartupOptList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startupOpts: [],
      filteredStartupOpts: [],
      selectedSupportCategory: null,
      selectedBiotechCategory: null,
      selectedCountry: null,
      currentPage: 1,
      startupOptsPerPage: 3,
      isFilterOpen: false,
    };
  }

  handlePageClick = (event) => {
    this.setState({ currentPage: Number(event.target.id) });
  };

  handleNextPage = () => {
    this.setState(
      (prevState) => ({
        currentPage: prevState.currentPage + 1,
      }),
      this.filterStartupOpts
    );
  };

  handleSupportOptionFilter = (supportOptionId) => {
    this.setState(
      { selectedSupportCategory: supportOptionId },
      this.filterStartupOpts
    );
  };

  handleCategoryFilter = (categoryId) => {
    this.setState(
      { selectedBiotechCategory: categoryId },
      this.filterStartupOpts
    );
  };

  handleCountryFilter = (countryId) => {
    this.setState(
      { selectedCountry: countryId, currentPage: 1 },
      this.filterStartupOpts
    );
  };

  toggleFilter = () => {
    this.setState((prevState) => ({
      isFilterOpen: !prevState.isFilterOpen,
    }));
  };


  filterStartupOpts = () => {
    const {
      selectedSupportCategory,
      selectedBiotechCategory,
      selectedCountry,
      startupOpts,
    } = this.state;

    const filteredStartupOpts = startupOpts.filter((startupOpt) => {
      const hasSelectedSupportCategory =
        selectedSupportCategory === null ||
        startupOpt.supportCategories.some(
          (category) => category.id === selectedSupportCategory
        );

      const hasSelectedBiotechCategory =
        selectedBiotechCategory === null ||
        startupOpt.biotechCategories.some(
          (category) => category.id === selectedBiotechCategory
        );

      const hasSelectedCountry =
        selectedCountry === null ||
        startupOpt.countries.some((country) => country.id === selectedCountry);

      return (
        hasSelectedSupportCategory &&
        hasSelectedBiotechCategory &&
        hasSelectedCountry
      );
    });

    this.setState({ filteredStartupOpts });
  };

  showAllStartupOpts = () => {
    this.setState(
      {
        selectedSupportCategory: null,
        selectedBiotechCategory: null,
        selectedCountry: null,
        currentPage: 1,
      },
      this.filterStartupOpts
    );
  };

  componentDidMount() {
    StartupOptDataService.getAllStartupOpts()
      .then((response) => {
        const startupOpts = response.data;
        this.setState({ startupOpts, filteredStartupOpts: startupOpts });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.filteredStartupOpts !== prevProps.filteredStartupOpts) {
      this.setState({ filteredStartupOpts: this.props.filteredStartupOpts });
    }
  }

  render() {
    const {
      filteredStartupOpts,
      currentPage,
      startupOptsPerPage,
      isFilterOpen,
      selectedBiotechCategory,
      selectedSupportCategory,
      selectedCountry,
    } = this.state;
  
    const totalPages = Math.ceil(filteredStartupOpts.length / startupOptsPerPage);
    const startIndex = (currentPage - 1) * startupOptsPerPage;
    const endIndex = startIndex + startupOptsPerPage;
    const displayedStartupOpts = filteredStartupOpts.slice(startIndex, endIndex);
  
    return (
      <div className={styles.container}>
        <div className={styles.controlButtons}>
          <button
            className={styles.allButton}
            onClick={this.showAllStartupOpts}
          >
            All opportunities
          </button>
          <button className={styles.filterButton} onClick={this.toggleFilter}>
            Choose Filter
          </button>
        </div>
  
        {isFilterOpen && (
          <div className={styles.filters}>
            <SupportCategoryOptions
              selectedCategory={selectedSupportCategory}
              handleCategoryFilter={this.handleSupportOptionFilter}
            />
  
            <BiotechCategoryOptions
              selectedCategory={selectedBiotechCategory}
              handleCategoryFilter={this.handleCategoryFilter}
            />
  
            <CountryOptions
              selectedCountry={selectedCountry}
              handleCountryFilter={this.handleCountryFilter}
            />
          </div>
        )}
  
        <div style={{ margin: "50px 0" }}></div>
  
        {filteredStartupOpts.length > 0 ? (
          <div>
            <ul className={styles["cards-list"]}>
              {displayedStartupOpts.map((startupOpt) => (
                <li
                  key={startupOpt.id}
                  className={`${styles["card-container"]} ${styles["list-item"]}`}
                >
                  <Card startupOpt={startupOpt} />
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
            title="We are sorry!"
            text="No opportunity to start a new business was found in chosen categories. Sign up for the newsletter and stay in touch!"
          />
        )}
      </div>
    );
  }
  
}

const mapStateToProps = (state) => ({
  startupOpts: state.startupOpts,
});

export default connect(mapStateToProps)(
  StartupOptList
);


