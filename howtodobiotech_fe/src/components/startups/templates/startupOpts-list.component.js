import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStartupOpt, deleteStartupOpt } from "../../../actions/startups";
import StartupOptDataService from "../../../service/Startup.service";
import Card from "../atoms/card";
import styles from "./startupOptsList.module.css";

const supportOptions = [
  {
    id: 1,
    name: "INCUBATOR",
    imageUrl: "/assets/incubator.png",
    color: "#91B3FA",
  },
  {
    id: 2,
    name: "ACCELERATOR",
    imageUrl: "/assets/accelerator.png",
    color: "#FF877F",
  },
  {
    id: 3,
    name: "INVESTMENT",
    imageUrl: "/assets/investment.png",
    color: "#4C4EFA",
  },
  {
    id: 4,
    name: "MENTORING",
    imageUrl: "/assets/mentoring.png",
    color: "#E8605A",
  },
  { id: 5, name: "AWARDS", imageUrl: "/assets/awards.png", color: "#7369FF" },
];

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

class StartupOptList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startupOpts: [],
      filteredStartupOpts: [],
      selectedCategory: null,
      selectedSupportOption: null,
      currentPage: 1,
      startupOptsPerPage: 6
    };
  }

  filterStartupOpts = () => {
    const { selectedCategory, selectedSupportOption, startupOpts } = this.state;

    const filteredStartupOpts = startupOpts.filter((startupOpt) => {
      const hasSelectedCategory =
        selectedCategory === null ||
        startupOpt.categories.some(
          (category) => category.id === selectedCategory
        );
      const hasSelectedSupportOption =
        selectedSupportOption === null ||
        startupOpt.supportCategories.some(
          (supportCategory) => supportCategory.id === selectedSupportOption
        );

      return hasSelectedCategory && hasSelectedSupportOption;
    });

    this.setState({ filteredStartupOpts });
  };

  
  handleCategoryFilter = (categoryId) => {
    this.setState({ selectedCategory: categoryId, currentPage: 1 }, this.filterStartupOpts);
  };

  handleSupportOptionFilter = (supportOptionId) => {
    this.setState(
      { selectedSupportOption: supportOptionId, currentPage: 1 },
      this.filterStartupOpts
    );
  };

  showAllStartupOpts = () => {
    this.setState(
      { selectedCategory: null, selectedSupportOption: null, currentPage: 1 },
      this.filterStartupOpts
    );
  };

  handlePageClick = (event) => {
    this.setState({ currentPage: Number(event.target.id) });
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
    const { filteredStartupOpts, currentPage, startupOptsPerPage } = this.state;

    const indexOfLastStartupOpt = currentPage * startupOptsPerPage;
    const indexOfFirstStartupOpt = indexOfLastStartupOpt - startupOptsPerPage;
    const currentStartupOpts = filteredStartupOpts.slice(indexOfFirstStartupOpt, indexOfLastStartupOpt);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredStartupOpts.length / startupOptsPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div>
        <div>
          <button
            className={styles["all-categories-button"]}
            onClick={this.showAllStartupOpts}
          >
            All support opportunities
          </button>
          {categoryOptions.map((category) => (
            <button
              key={category.id}
              onClick={() => this.handleCategoryFilter(category.id)}
              style={{ backgroundColor: category.color }}
              className={styles["category-button"]}
            >
              {category.name}
            </button>
          ))}
          {supportOptions.map((supportOption) => (
            <button
              key={supportOption.id}
              onClick={() => this.handleSupportOptionFilter(supportOption.id)}
              style={{ backgroundColor: supportOption.color }}
              className={styles["support-option-button"]}
            >
              {supportOption.name}
            </button>
          ))}
        </div>
        <div style={{ margin: "50px 0" }}></div>

        {filteredStartupOpts.length > 0 ? (
          <div>
            <ul className={styles["cards-list"]}>
              {currentStartupOpts.map((startupOpt) => {
                const firstSupportCategory =
                  startupOpt.supportCategories && startupOpt.supportCategories[0];
                const supportCategory =
                  firstSupportCategory &&
                  supportOptions.find(
                    (supportOption) =>
                      supportOption.id === firstSupportCategory.id
                  );

                return (
                  <li
                    key={startupOpt.id}
                    className={`${styles["card-container"]} ${styles["list-item"]}`}
                  >
                    {supportCategory && (
                      <img
                        src={supportCategory.imageUrl}
                        alt={supportCategory.name}
                        className={styles["support-category-image"]}
                      />
                    )}
                    <Card startupOpt={startupOpt} />
                  </li>
                );
              })}
            </ul>
            <div className={styles.pagination}>
            <div className={styles.paginationButtons}>
              {pageNumbers.map((number) => {
                return (
                  <button
                    key={number}
                    id={number}
                    onClick={this.handlePageClick}
                    className={`${styles.pageButton} ${currentPage === number ? styles.active : ''}`}
                  >
                    {number}
                  </button>
                );
              })}
            </div>
            </div>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  startupOpts: state.startupOpts,
});

export default connect(mapStateToProps, { updateStartupOpt, deleteStartupOpt })(
  StartupOptList
);
