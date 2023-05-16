import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import styles from "./CenteredText.module.css";

const CenteredTextWithButton = ({ text, textButton, url }) => {
  const handleClick = () => {
    window.location.href = url;
  };
  return (
    <div className={styles.container}>
      <MDBContainer>
        <MDBRow className={styles.componentContent}>
          <MDBCol className={`d-flex flex-column align-items-center ${styles.col}`}>
            <div className={styles.centeredText}>{text}</div>
            <MDBBtn
              className={`${styles.redirectButton} ${styles.customButton}`}
              onClick={handleClick}
            >
              {textButton}
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default CenteredTextWithButton;


