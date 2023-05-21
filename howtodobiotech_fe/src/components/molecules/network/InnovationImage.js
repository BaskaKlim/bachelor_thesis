import React from "react";
import { MDBCardImage } from "mdb-react-ui-kit";
import styles from "../common/Image.module.css";

const InnovationImage = ({ skillCategory, className }) => {
  let imageSrc = "";

  switch (skillCategory) {
    case 1:
      imageSrc = "/assets/medicine.jpg";
      break;
    case 2:
      imageSrc = "/assets/bioinformatics.jpg";
      break;
    case 3:
      imageSrc = "/assets/energy.jpg";
      break;
    case 4:
      imageSrc = "/assets/food.jpg";
      break;
    case 5:
      imageSrc = "/assets/environmental.jpg";
      break;
    case 6:
      imageSrc = "/assets/agriculture.jpg";
      break;
    case 7:
      imageSrc = "/assets/marine.jpg";
       break; 
    default:
      imageSrc = "/assets/bioinformatics.jpg";
      break;
  }

  return (
    <div className={styles.imageContainer}>
      <div className={styles.imageOverlay}></div>
      <MDBCardImage
        src={imageSrc}
        alt="Innovation Image"
        position="top"
        className={styles.categoryImage}
      />
    </div>
  );
};

export default InnovationImage;
