import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faGitlab,
} from "@fortawesome/free-brands-svg-icons";

import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <MDBFooter
      className={`page-footer font-small pt-4 mt-4 ${styles.footerBackground}`}
    >
      <MDBContainer fluid="true" className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="3" className="text-center">
            <div className={styles.logoSection}>
              <img
                className={styles.logo}
                src="/assets/logo_blue_landscape.png"
                alt="How To Do Biotech"
              />
              <div className={styles.shortText}>
                Find the right resources, mentorship, and support they need.
              </div>
            </div>
          </MDBCol>

          <MDBCol
            md="6"
            className={`text-center fluid ${styles.subscriptionSection}`}
          >
            <div className={styles.lightText}>
              Subscribe for our news and get all information about skill
              opportunities and support for your biotech ides.
            </div>
            <div className={styles.formContainer}>
              <form className={`input-group ${styles.centeredForm}`}>
                <MDBInput
                  hint="Your email"
                  type="text"
                  containerclass="mt-0 mb-0"
                />
                <MDBBtn color="secondary" className="mb-0 ml-2">
                  Subscribe
                </MDBBtn>
              </form>

              <div className={styles.agreementSection}>
                <input
                  type="checkbox"
                  id="privacyPolicy"
                  name="privacyPolicy"
                  value="Agree"
                />
                <label htmlFor="privacyPolicy">
                  {" "}
                  I agree with the <span></span>
                  <a href="#!" className="mr-4">
                    Privacy Policy
                  </a>
                  <a href="#!">Terms and Conditions</a>
                </label>
              </div>
            </div>
            <div className={styles.allRightsReserved}>
              © {new Date().getFullYear()} Barbara Klimekova | Opensource licence
             <div> 
              <a href="https://www.freepik.com/free-vector/access-control-system-abstract-concept_12085707.htm#query=login&position=0&from_view=search&track=sph">Images by vectorjuice</a> on Freepik</div>
            </div>
          </MDBCol>

          <MDBCol md="3" className="text-center">
            <h4 className={styles.contact}>Contact Us</h4>
            <div className={styles.contactSection}>
              <p>b_klimekova@utb.cz</p>
              <p>+421 901705737</p>
            </div>
            <div className={styles.socialMediaSection}>
              <FontAwesomeIcon
                icon={faInstagram}
                className={styles.socialMediaIcon}
              />
              <FontAwesomeIcon
                icon={faLinkedin}
                className={styles.socialMediaIcon}
              />
              <FontAwesomeIcon
                icon={faGitlab}
                className={styles.socialMediaIcon}
              />
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </MDBFooter>
  );
};

export default Footer;
