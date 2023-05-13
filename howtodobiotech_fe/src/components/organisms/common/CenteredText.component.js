import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from "mdb-react-ui-kit";
import styles from "./CenteredText.module.css";

const CenteredTextWithButton = ({ text, textButton }) => {
  const handleClick = () => {
    window.location.href = "https://your-redirection-url.com";
  };
  return (
    <div>
      <MDBContainer className={`${styles.container} component-wrapper`}>
        <MDBRow className={`${styles.centeredText} component-content`}>
          <MDBCol>
            <div>{text}</div>
            <MDBBtn className={styles.redirectButton} onClick={handleClick}>
              {textButton}
            </MDBBtn>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default CenteredTextWithButton;
