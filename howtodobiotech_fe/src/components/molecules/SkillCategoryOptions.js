import React from "react";
import styles from "./Options.module.css"
const skillCategories = [
  {
    id: 1,
    name: "WORKSHOP",
    title: "WORKSHOP",
    imageUrl: "/assets/workshop.png",
    color: "#FFA6A2",
  },
  {
    id: 2,
    name: "SUMMER_WINTER_SCHOOL",
    title: "SUMMER WINTER SCHOOL",
    imageUrl: "/assets/school.png",
    color: "#4B4DF7",
  },
  {
    id: 3,
    name: "CONFERENCE",
    title: "CONFERENCE",
    imageUrl: "/assets/conference.png",
    color: "#FE7062",
  },
  {
    id: 4,
    name: "INTERNSHIP",
    title: "INTERNSHIP",
    imageUrl: "/assets/internship.png",
    color: "#CEDAF6",
  },
  {
    id: 5,
    name: "ACADEMY",
    title: "ACADEMY",
    imageUrl: "/assets/academy.png",
    color: "#B23730",
  },
  {
    id: 6,
    name: "HACKATHON",
    title: "HACKATHON",
    imageUrl: "/assets/hackathon.png",
    color: "#9695F2",
  },
];

const SkillCategoryOptions = ({selectedCategory, handleCategoryFilter }) => {
  return (
    <div className="filter-group">
      <div className="filter-group-title">Choose opportunity :  </div>
      {skillCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryFilter(category.id)}
          style={{
            backgroundColor: category.id === selectedCategory ? category.color : "#EFEFEF",
            color: category.id === selectedCategory ? "black" : "gray",
          }}
          className={styles.categoryButton}
        >
          {category.title}
        </button>
      ))}
    </div>
  
  );
};

export default SkillCategoryOptions;
