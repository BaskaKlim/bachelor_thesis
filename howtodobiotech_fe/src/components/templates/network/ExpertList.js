import React, { Component } from "react";
import { connect } from "react-redux";
import ExpertDataService from "../../../service/Expert.service";
import ExpertCard from "../../organisms/network/ExpertCard";
import styles from "../common/OptsList.module.css";
import NotFoundPage from "../../organisms/common/NotFoundPage.component";
import ExpertCategoryOptions from "../../molecules/ExpertCategoryOptions";
import Pagination from "../../molecules/Pagination";

class ExpertList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      experts: [],
      filteredExperts: [],
      currentPage: 1,
      expertsPerPage: 3,
      selectedCategory: null,
      isFilterOpen: false,
    };
  }

  filterExperts = () => {
    const { selectedCategory, experts } = this.state;

    const filteredExperts = experts.filter((expert) =>
      expert.expertises.some((expertise) => expertise.id === selectedCategory)
    );

    this.setState({ filteredExperts });
  };

  handleCategoryFilter = (expertiseId) => {
    this.setState(
      { selectedCategory: expertiseId, currentPage: 1 },
      this.filterExperts
    );
  };

  showAllExperts = () => {
    this.setState({ filteredExperts: this.state.experts, currentPage: 1 });
  };

  handlePageClick = (page) => {
    this.setState({ currentPage: page }, this.filterExperts);
  };
  
  handlePrevPage = () => {
    this.setState(
      (prevState) => ({
        currentPage: prevState.currentPage - 1,
      }),
      this.filterExperts
    );
  };

  handleNextPage = () => {
    this.setState(
      (prevState) => ({
        currentPage: prevState.currentPage + 1,
      }),
      this.filterExperts
    );
  };

  toggleFilter = () => {
    this.setState((prevState) => ({
      isFilterOpen: !prevState.isFilterOpen,
    }));
  };

  componentDidMount() {
    ExpertDataService.getAllExperts()
      .then((response) => {
        const experts = response.data;
        this.setState({ experts, filteredExperts: experts });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.experts !== prevProps.experts) {
      this.setState({
        experts: this.props.experts,
        filteredExperts: this.props.experts,
      });
    }
  }

  render() {
    const { filteredExperts, currentPage, expertsPerPage, isFilterOpen } =
      this.state;
    const totalPages = Math.ceil(filteredExperts.length / expertsPerPage);
    const startIndex = (currentPage - 1) * expertsPerPage;
    const endIndex = startIndex + expertsPerPage;
    const displayedExperts = filteredExperts.slice(startIndex, endIndex);

    return (
      <div className={styles.container}>
        <div className={styles.filterOptions}>
          <div className={styles.controlButtons}>
            <button
              className={`${styles["all-categories-button"]} ${styles.allButton}`}
              onClick={this.showAllExperts}
            >
              All Experts
            </button>
            <button
              className={`${styles["filter-button"]} ${styles.filterButton}`}
              onClick={this.toggleFilter}
            >
              Choose Expertise
            </button>
          </div>
          {isFilterOpen && (
            <ExpertCategoryOptions
              selectedCategory={this.state.selectedCategory}
              handleExpertFilter={this.handleCategoryFilter}
            />
          )}
        </div>

        {displayedExperts.length > 0 ? (
          <div className={styles.listContainer}>
            <ul className={styles["cards-list"]}>
              {displayedExperts.map((expert) => (
                <li key={expert.id} className={styles["list-item"]}>
                  <ExpertCard expert={expert} />
                </li>
              ))}
            </ul>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageClick={this.handlePageClick}
              onPrevPage={this.handlePrevPage}
              onNextPage={this.handleNextPage}
            />
          </div>
        ) : (
          <NotFoundPage
            title="Did not find what you were looking for?"
            text="If you need help from an expert with special expertise, let us know. Our network is huge, and we can help to connect you to the right people."
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  experts: state.experts,
});

export default connect(mapStateToProps)(ExpertList);

