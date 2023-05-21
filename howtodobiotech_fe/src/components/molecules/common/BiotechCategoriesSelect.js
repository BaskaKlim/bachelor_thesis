import React from "react";
import Select from "react-select";
import styles from "./Select.module.css"
const BiotechCategoriesSelect = ({ value, onChange }) => {
  const categoryOptions = [
    { id: 1, name: "MEDICINE" },
    { id: 2, name: "BIOINFORMATICS" },
    { id: 3, name: "ENERGY" },
    { id: 4, name: "FOOD" },
    { id: 5, name: "ENVIRONMENTAL" },
    { id: 6, name: "AGRICULTURE" },
    { id: 7, name: "MARINE" },
  ];

  return (
    <div className={styles.select}>
    <Select
      options={categoryOptions.map((category) => ({
        value: category,
        label: category.name,
        key: `category-${category.id}`,
      }))}
      isMulti
      onChange={onChange}
      value={value}
    />
    </div>
  );
};

export default BiotechCategoriesSelect;
