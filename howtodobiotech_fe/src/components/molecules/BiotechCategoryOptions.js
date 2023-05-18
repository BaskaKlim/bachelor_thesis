import React from "react";
import styles from "./Options.module.css"


const biotechCategories = [
  {
    id: 1,
    name: "MEDICINE",
    color: "#E35149",
  },
  {
    id: 2,
    name: "BIOINFORMATICS",
    color: "#493dc4",
  },
  { id: 3, name: "ENERGY", color: "#7369ff" },
  { id: 4, name: "FOOD", color: "#FF928F" },
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
  { id: 7, name: "MARINE", color: "#4B4DF7" },
];

const BiotechCategoryOptions = ({selectedCategory, handleCategoryFilter }) => {
  return (
    <div className="filter-group">
      <div className="filter-group-title">Choose biotech field: </div>
      {biotechCategories.map((category) => (
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

export default BiotechCategoryOptions;