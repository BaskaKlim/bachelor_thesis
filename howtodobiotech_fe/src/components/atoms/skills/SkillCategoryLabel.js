import React from 'react';
import { MDBBadge } from 'mdb-react-ui-kit';
import styles from '../common/Label.module.css';

const SkillCategoryLabel = ({ id, className }) => {
  const skillCategoryOption = [
    {
      id: 1,
      name: "WORKSHOP",
      color: "#FFA6A2",
    },
    {
      id: 2,
      name: "SUMMER_WINTER_SCHOOL",
      color: "#4B4DF7",
    },
    {
      id: 3,
      name: "CONFERENCE",
      color: "#FE7062",
    },
    {
      id: 4,
      name: "INTERNSHIP",
      color: "#CEDAF6",
    },
    {
      id: 5,
      name: "ACADEMY",
      color: "#B23730",
    },
    {
      id: 6,
      name: "HACKATHON",
      color: "#9695F2",
    },
  ];

  const category = skillCategoryOption.find((option) => option.id === id);
  const categoryColor = category ? category.color : null;
  const categoryName = category ? category.name : '';

  return (
    <MDBBadge bg={categoryColor} className={`${styles.labelStyle} ${className}`}>
      {categoryName}
    </MDBBadge>
  );
};

export default SkillCategoryLabel;

