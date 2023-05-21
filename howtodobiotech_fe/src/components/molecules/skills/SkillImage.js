import React from "react";
import { MDBCardImage } from "mdb-react-ui-kit";
import styles from "../common/Image.module.css";

const SkillImage = ({ skillCategory, className }) => {
  let imageSrc = "";

  switch (skillCategory) {
    case 1:
      imageSrc = "/assets/workshop.png";
      break;
    case 2:
      imageSrc = "/assets/school.png";
      break;
    case 3:
      imageSrc = "/assets/conference.png";
      break;
    case 4:
      imageSrc = "/assets/internship.png";
      break;
    case 5:
      imageSrc = "/assets/academy.png";
      break;
    case 6:
      imageSrc = "/assets/hackathon.png";
      break;
    default:
      imageSrc = "/assets/school.jpg";
      break;
  }

  return (
    <div className={styles.imageContainer}>
      <div className={styles.imageOverlay}></div>
      <MDBCardImage
        src={imageSrc}
        alt="Skill Image"
        position="top"
        className={styles.categoryImage}
      />
    </div>
  );
};

export default SkillImage;
