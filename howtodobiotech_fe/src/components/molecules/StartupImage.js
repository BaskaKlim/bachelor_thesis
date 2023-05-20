import React from "react";
import { MDBCardImage } from "mdb-react-ui-kit";
import styles from "./Image.module.css";


const StartupImage = ({ supportCategory, className }) => {
  let imageSrc = "";

  switch (supportCategory) {
    case 1:
      imageSrc ="/assets/incubator.png";
      break;
    case 2:
      imageSrc =  "/assets/accelerator.png";
      break;
    case 3:
      imageSrc = "/assets/investment.png";
      break;
    case 4:
      imageSrc = "/assets/mentoring.png";
      break;
    case 5:
      imageSrc = "/assets/awards.png";
      break;
    default:
      imageSrc = "/assets/incubator.png";
      break;
  }

  return (
    <div className={styles.imageContainer}>
      <div className={styles.imageOverlay}></div>
      <MDBCardImage
        src={imageSrc}
        alt="Startup Image"
        position="top"
        className={styles.categoryImage}
      />
    </div>
  );
};

export default StartupImage;
