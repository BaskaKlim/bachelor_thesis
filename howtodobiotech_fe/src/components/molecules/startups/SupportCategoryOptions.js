import React from "react";
import styles from "../common/Options.module.css";

const supportCategories = [
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

const SupportCategoryOptions = ({ selectedCategory, handleCategoryFilter }) => {
  return (
    <div className="filter-group">
      <div className="filter-group-title">Choose support:</div>
      {supportCategories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryFilter(category.id)}
          style={{
            backgroundColor: category.id === selectedCategory ? category.color : "#EFEFEF",
            color: category.id === selectedCategory ? "black" : "gray",
          }}
          className={styles.categoryButton}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default SupportCategoryOptions;
