import React from "react";
import styles from "./NewsletterBanner.module.css";
import { MDBInput, MDBBtn } from "mdb-react-ui-kit";

const Newsletter = ({ backgroundColor = "#ffffff", text }) => {
  const containerStyle = {
    backgroundColor: backgroundColor,
  };

  return (
    <div className={`font-small pt-4 mt-4 ${styles.newsletterBackground}`} style={containerStyle}>
      <div className={`${styles.subscriptionSection}`}>
        <p className={styles.lightText}>{text}</p>
        <div className={styles.formContainer}>
          <form className={`input-group ${styles.centeredForm}`}>
            <MDBInput hint="Your email" type="text" containerClass={`mt-0 mb-0 ${styles.inputField}`} />
            <MDBBtn color="secondary" className={`mb-0 ml-2 ${styles.subscribeButton}`}>
              Subscribe
            </MDBBtn>
          </form>

          <div className={styles.agreementSection}>
            <div className={styles.checkboxContainer}>
              <input type="checkbox" id="privacyPolicy" name="privacyPolicy" value="Agree" />
              <label htmlFor="privacyPolicy"></label>
            </div>
            <span>I agree with the</span>
            <a href="#!" className="mr-4">
              Privacy Policy
            </a>
            <a href="#!">Terms and Conditions</a>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Newsletter;
