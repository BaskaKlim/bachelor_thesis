import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSkillOpt, deleteSkillOpt } from "../../../actions/skills";
import SkillOptDataService from "../../../service/Skill.service";
import Card from "../../organisms/skills/Skill.card";
import styles from "./SkillOptsList.module.css";
import NotFoundPage from "../../organisms/common/NotFoundPage.component";
import Pagination from "../../molecules/Pagination";
import SkillCategoryOptions from "../../molecules/SkillCategoryOptions";
import CountryOptions from "../../molecules/CountryOptions";
import BiotechCategoryOptions from "../../molecules/BiotechCategoryOptions";

class SkillOptList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skillOpts: [],
      filteredSkillOpts: [],
      selectedCategory: null,
      selectedSkillCategory: null,
      selectedCountry: null,
      currentPage: 1,
      skillOptsPerPage: 3,
      isFilterOpen: false,
    };
  }

  handlePageClick = (event) => {
    this.setState(
      { currentPage: Number(event.target.id) },
      this.filterSkillOpts
    );
  };

  paginate = (skillOpts) => {
    const { currentPage, skillOptsPerPage } = this.state;

    const startIndex = (currentPage - 1) * skillOptsPerPage;
    const endIndex = startIndex + skillOptsPerPage;

    return skillOpts.slice(startIndex, endIndex);
  };

  handlePrevPage = () => {
    this.setState(
      (prevState) => ({
        currentPage: prevState.currentPage - 1,
      }),
      this.filterSkillOpts
    );
  };

  handleNextPage = () => {
    this.setState(
      (prevState) => ({
        currentPage: prevState.currentPage + 1,
      }),
      this.filterSkillOpts
    );
  };

  handleSkillCategoryFilter = (skillCategoryId) => {
    this.setState(
      { selectedSkillCategory: skillCategoryId, currentPage: 1 },
      this.filterSkillOpts
    );
  };

  handleCategoryFilter = (categoryId) => {
    this.setState(
      { selectedCategory: categoryId, currentPage: 1 },
      this.filterSkillOpts
    );
  };

  handleCountryFilter = (countryId) => {
    this.setState(
      { selectedCountry: countryId, currentPage: 1 },
      this.filterSkillOpts
    );
  };

  toggleFilter = () => {
    this.setState((prevState) => ({
      isFilterOpen: !prevState.isFilterOpen,
    }));
  };

  filterSkillOpts = () => {
    const {
      selectedCategory,
      selectedSkillCategory,
      selectedCountry,
      skillOpts,
    } = this.state;

    const filteredSkillOpts = skillOpts.filter((skillOpt) => {
      const hasSelectedCategory =
        selectedCategory === null ||
        (skillOpt.biotechCategories &&
          skillOpt.biotechCategories.some(
            (category) => category.id === selectedCategory
          ));

      const hasSelectedSkillCategory =
        selectedSkillCategory === null ||
        (skillOpt.skillCategories &&
          skillOpt.skillCategories.some(
            (skillCategory) => skillCategory.id === selectedSkillCategory
          ));

      const hasSelectedCountry =
        selectedCountry === null ||
        (skillOpt.countries &&
          skillOpt.countries.some((country) => country.id === selectedCountry));

      return (
        hasSelectedCategory && hasSelectedSkillCategory && hasSelectedCountry
      );
    });

    this.setState({ filteredSkillOpts });
  };

  showAllSkillOpts = () => {
    this.setState(
      {
        selectedCategory: null,
        selectedSkillCategory: null,
        selectedCountry: null,
        currentPage: 1,
      },
      this.filterSkillOpts
    );
  };

  componentDidMount() {
    SkillOptDataService.getAllSkillOpts()
      .then((response) => {
        const skillOpts = response.data;
        this.setState(
          { skillOpts, filteredSkillOpts: skillOpts },
          this.filterSkillOpts
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.selectedCategory !== prevState.selectedCategory ||
      this.state.selectedSkillCategory !== prevState.selectedSkillCategory ||
      this.state.selectedCountry !== prevState.selectedCountry
    ) {
      this.filterSkillOpts();
    }
  }

  render() {
    const {
      filteredSkillOpts,
      currentPage,
      skillOptsPerPage,
      isFilterOpen,
      selectedCategory,
      selectedSkillCategory,
      selectedCountry,
    } = this.state;
    const totalPages = Math.ceil(filteredSkillOpts.length / skillOptsPerPage);
    const startIndex = (currentPage - 1) * skillOptsPerPage;
    const endIndex = startIndex + skillOptsPerPage;
    const displayedSkillOpts = filteredSkillOpts.slice(startIndex, endIndex);

    return (
      <div className={styles.container}>
         <div className={styles.controlButtons}>
            <button
              className={styles.allButton}
              onClick={this.showAllSkillOpts}
            >
              All opportunities
            </button>
            <button className={styles.filterButton} onClick={this.toggleFilter}>
              Choose Filter
            </button>
          </div>
        <div className={styles.filters}> 
         

          {isFilterOpen && (
            <div className={styles.filters}>
              <SkillCategoryOptions
                selectedCategory={selectedSkillCategory}
                handleCategoryFilter={this.handleSkillCategoryFilter}
              />

              <BiotechCategoryOptions
                selectedCategory={selectedCategory}
                handleCategoryFilter={this.handleCategoryFilter}
              />

              <CountryOptions
                selectedCountry={selectedCountry}
                handleCountryFilter={this.handleCountryFilter}
              />
            </div>
          )}
        </div>

        <div style={{ margin: "50px 0" }}></div>

        {filteredSkillOpts.length > 0 ? (
          <div>
            <ul className={styles["cards-list"]}>
              {displayedSkillOpts.map((skillOpt) => (
                <li
                  key={skillOpt.id}
                  className={`${styles["card-container"]} ${styles["list-item"]}`}
                >
                  <Card skillOpt={skillOpt} />
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
            text="No opportunity to gain new skills was found in chosen categories. Sign up for the newsletter and stay in touch!"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  skillOpts: state.skillOpts,
});

export default connect(mapStateToProps, { updateSkillOpt, deleteSkillOpt })(
  SkillOptList
);
