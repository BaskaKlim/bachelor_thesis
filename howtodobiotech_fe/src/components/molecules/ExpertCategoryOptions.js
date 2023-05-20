import React from "react";
import styles from "./Options.module.css"
const expertiseCategories = [
  {
    id: 1,
    name: "BUSINESS_DEVELOPMENT",
    title: "BUSINESS DEVELOPMENT",
    color: "#E35149",
  },
  { id: 2, name: "LIFE_SCIENCE", title: "LIFE SCIENCE", color: "#110777" },
  { id: 3, name: "CHEMISTRY", title: "CHEMISTRY", color: "#7369ff" },
  { id: 4, name: "BIOLOGY", title: "BIOLOGY", color: "#FF928F" },
  { id: 5, name: "BIOINFORMATICS", title: "BIOINFORMATICS", color: "#91B3FA" },
  { id: 6, name: "DATA_SCIENCE", title: "DATA SCIENCE", color: "#A22B25" },
  { id: 7, name: "LEGAL", title: "LEGAL", color: "#4B4D4B4DF7F7" },
  {
    id: 8,
    name: "MVP_PRTOTOTYPING",
    title: "MVP PRTOTOTYPING",
    color: "#A22B25",
  },
  {
    id: 9,
    name: "BUSINESS_VALIDATION",
    title: "BUSINESS VALIDATION",
    color: "#7369ff",
  },
  { id: 10, name: "PRODUCT_DESING", title: "PRODUCT DESING", color: "#FF928F" },
  { id: 11, name: "CLINICAL_TRIAL", title: "CLINICAL TRIAL", color: "#110777" },
  { id: 12, name: "FINANCE", title: "FINANCE", color: "#E35149" },
];
const ExpertCategoryOptions = ({ selectedCategory, handleExpertFilter }) => {
  
    return (
      <div className={styles["filter-group"]}>
      <div className={styles["options-container"]}>
        {expertiseCategories.map((expertise) => (
          <button
            key={expertise.id}
            onClick={() => handleExpertFilter(expertise.id)}
            style={{
              backgroundColor: expertise.id === selectedCategory ? "#4B4DF7" : "#EFEFEF",
              color: expertise.id === selectedCategory ? "black" : "gray",
            }}
            className={styles.categoryButton}
          >
            {expertise.title}
          </button>
        ))}
        </div>
      </div>
    );
  };
  
export default ExpertCategoryOptions;
