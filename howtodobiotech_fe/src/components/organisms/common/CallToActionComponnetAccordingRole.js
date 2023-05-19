import React, { useState, useEffect } from "react";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";
import Button from "../../atoms/common/CallToAction.button";

import styles from "./CallToActionComponnetAccordingRole.module.css";

const CallToActionComponnetAccordingRole = ({
  textPublic,
  urlPublic,
  buttonTextPublic,
  textLoggedIn,
  urlLoggedIn,
  buttonTextLoggedIn,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoggedInStatus = () => {
      const token = localStorage.getItem("authToken");
      setIsLoggedIn(!!token);
    };

    checkLoggedInStatus();
    window.addEventListener("storage", checkLoggedInStatus);

    return () => {
      window.removeEventListener("storage", checkLoggedInStatus);
    };
  }, []);

  return (
    <div className={styles.container}>
      <MDBContainer>
        <MDBRow className={styles.componentContent}>
          <MDBCol
            className={`d-flex flex-column align-items-center ${styles.col}`}
          >
            <div className={styles.centeredText}>
              {isLoggedIn ? textLoggedIn : textPublic}
            </div>
            {isLoggedIn ? (
              <Button url={urlLoggedIn} textButton={buttonTextLoggedIn} />
            ) : (
              <Button
                url={urlLoggedIn}
                textButton={buttonTextLoggedIn}
                className={isLoggedIn ? styles.addButton : ""}
              />
            )}
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default CallToActionComponnetAccordingRole;
