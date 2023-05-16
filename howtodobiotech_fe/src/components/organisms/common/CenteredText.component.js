import React from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Button from "../../atoms/common/CallToAction.button";

import styles from "./CenteredText.module.css";
const CenteredTextWithButton = ({ text, textButton, url }) => {
  return (
    <div className={styles.container}>
      <MDBContainer>
        <MDBRow className={styles.componentContent}>
          <MDBCol
            className={`d-flex flex-column align-items-center ${styles.col}`}
          >
            <div className={styles.centeredText}>{text}</div>
            <Button url={url} textButton={textButton} />
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default CenteredTextWithButton;
