import React from "react";
import Select from "react-select";
import styles from "./Select.module.css"

const SkillCategoriesSelect = ({ value, onChange }) => {
  const skillCategoryOptions = [
    { id: 1, name: "WORKSHOP", title: "WORKSHOP" },
    { id: 2, name: "SUMMER_WINTER_SCHOOL", title: "SUMMER WINTER SCHOOL" },
    { id: 3, name: "CONFERENCE", title: "CONFERENCE" },
    { id: 4, name: "INTERNSHIP", title: "INTERNSHIP" },
    { id: 5, name: "ACADEMY", title: "ACADEMY" },
    { id: 6, name: "HACKATHON", title: "HACKATHON" },
  ];

  return (
    <div className={styles.select}>
    <Select
      options={skillCategoryOptions.map((skillCategory) => ({
        value: skillCategory,
        label: skillCategory.title,
        key: `category-${skillCategory.id}`,
      }))}
      isMulti
      onChange={onChange}
      value={value}
    />
    </div>
  );
};

export default SkillCategoriesSelect;
