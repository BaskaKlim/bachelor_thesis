import React, { Component } from "react";
import { connect } from "react-redux";
import { updateSkillOpt, deleteSkillOpt } from "../../../actions/skills";
import SkillOptDataService from "../../../service/Skill.service";
import Card from "../organisms/SkillCard";
import styles from "./SkillOptsList.module.css";

const skillCategories = [
  {
    id: 1,
    name: "WORKSHOP",
    imageUrl: "/assets/workshop.png",
    color: "#FFA6A2",
  },
  {
    id: 2,
    name: "SUMMER_WINTER_SCHOOL",
    imageUrl: "/assets/school.png",
    color: "#4B4DF7",
  },
  {
    id: 3,
    name: "CONFERENCE",
    imageUrl: "/assets/conference.png",
    color: "#FE7062",
  },
  {
    id: 4,
    name: "INTERNSHIP",
    imageUrl: "/assets/internship.png",
    color: "#CEDAF6",
  },
  { id: 5, name: "ACADEMY", imageUrl: "/assets/academy.png", color: "#B23730" },
  {
    id: 6,
    name: "HACKATHON",
    imageUrl: "/assets/hackathon.png",
    color: "#9695F2",
  },
];

const categoryOptions = [
  {
    id: 1,
    name: "MEDICINE",
    color: "#E35149",
  },
  {
    id: 2,
    name: "BIOINFORMATICS",
    color: "#110777",
  },
  { id: 3, name: "ENERGY", imageUrl: "/assets/energy.jpg", color: "#7369ff" },
  { id: 4, name: "FOOD", imageUrl: "/assets/food.jpg", color: "#FF928F" },
  {
    id: 5,
    name: "ENVIRONMENTAL",
    color: "#91B3FA",
  },
  {
    id: 6,
    name: "AGRICULTURE",
    color: "#A22B25",
  },
  { id: 7, name: "MARINE", imageUrl: "/assets/marine.jpg", color: "#4B4DF7" },
];

class SkillOptList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skillOpts: [],
      filteredSkillOpts: [],
      selectedCategory: null,
      selectedSkillCategory: null,
      currentPage: 1, // current page number
      skillOptsPerPage: 6, // number of skillOpts to be displayed per page
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
      { selectedSkillCategory: skillCategoryId },
      this.filterSkillOpts
    );
  };
  filterSkillOpts = () => {
    const { selectedCategory, selectedSkillCategory, skillOpts } = this.state;

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

      return hasSelectedCategory && hasSelectedSkillCategory;
    });

    this.setState({ filteredSkillOpts });
  };

  handleCategoryFilter = (categoryId) => {
    this.setState({ selectedCategory: categoryId }, this.filterSkillOpts);
  };

  findCategoryImageUrl = (skillOpt) => {
    const lastSkillCategory =
      skillOpt.skillCategories[skillOpt.skillCategories.length - 1];
    const category = skillCategories.find(
      (category) => category.id === lastSkillCategory.id
    );
    return category ? category.imageUrl : null;
  };

  showAllSkillOpts = () => {
    this.setState({ selectedCategory: null }, this.filterSkillOpts);
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

  componentDidUpdate(prevProps) {
    if (this.props.filteredSkillOpts !== prevProps.filteredSkillOpts) {
      this.setState({ filteredSkillOpts: this.props.filteredSkillOpts });
    }
  }

  render() {
    const { filteredSkillOpts, currentPage, skillOptsPerPage } = this.state;

    const indexOfLastSkillOpt = currentPage * skillOptsPerPage;
    const indexOfFirstSkillOpt = indexOfLastSkillOpt - skillOptsPerPage;
    const currentSkillOpts = filteredSkillOpts.slice(
      indexOfFirstSkillOpt,
      indexOfLastSkillOpt
    );

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(filteredSkillOpts.length / skillOptsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    return (
      <div>
        <div>
          <button
            className={styles["all-categories-button"]}
            onClick={this.showAllSkillOpts}
          >
            All skill opportunities
          </button>
          {skillCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => this.handleSkillCategoryFilter(category.id)}
              style={{ backgroundColor: category.color }}
              className={styles["category-button"]}
            >
              {category.name}
            </button>
          ))}
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
        </div>
        <div style={{ margin: "50px 0" }}></div>
        {filteredSkillOpts.length > 0 ? (
          <div>
            <ul className={styles["cards-list"]}>
              {currentSkillOpts.map((skillOpt) => {
                const imageUrl = this.findCategoryImageUrl(skillOpt);
                return (
                  <li
                    key={skillOpt.id}
                    className={`${styles["card-container"]} ${styles["list-item"]}`}
                  >
                    {imageUrl && (
                      <div className={styles["image-container"]}>
                        <div className={styles["image-overlay"]}></div>
                        <img
                          src={imageUrl}
                          alt="Category"
                          className={styles["category-image"]}
                        />
                      </div>
                    )}
                    <Card skillOpt={skillOpt} />
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
                      className={`${styles.pageButton} ${
                        currentPage === number ? styles.active : ""
                      }`}
                    >
                      {number}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className={styles.notFoundContainer}>
            <p>We are sorry, no skill options in chosen categories found.</p>
            <img
              src="/assets/404.jpg"
              alt="Not Found"
              className={styles["notFoundImage"]}
            />
          </div>
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
