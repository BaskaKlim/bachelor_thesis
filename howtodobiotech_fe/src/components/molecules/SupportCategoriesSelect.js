import React from "react";
import Select from "react-select";
import styles from "./Select.module.css"

const SupportCategoriesSelect = ({ value, onChange }) => {
  const supportCategoryOptions = [
    { id: 1, name: "INCUBATOR"},
    { id: 2, name: "ACCELERATOR" },
    { id: 3, name: "INVESTMENT"},
    { id: 4, name: "MENTORING" },
    { id: 5, name: "AWARDS" },
  ];

  return (
    <div className={styles.select}>
    <Select
      options={supportCategoryOptions.map((supportCategory) => ({
        value: supportCategory,
        label: supportCategory.name,
        key: `category-${supportCategory.id}`,
      }))}
      isMulti
      onChange={onChange}
      value={value}
    />
    </div>
  );
};

export default SupportCategoriesSelect;
