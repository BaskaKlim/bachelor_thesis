import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBTypography,
  MDBCardImage,
  MDBBtn,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { FaLinkedin, FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from "./ExpertCard.module.css";
import CategoryLabel from "../../atoms/common/Category.label";
import CountryLabel from "../../atoms/common/Country.label";

const ExpertCard = ({ expert }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const countryLabels = expert.countries.map((country) => (
    <CountryLabel key={country.id} country={country} className="labelStyle" />
  ));

  const expertiseLabels = expert.expertises.map((expertise) => (
    <CategoryLabel
      key={expertise.id}
      variant="caption"
      category={{ id: expertise.id, name: expertise.name }}
      className="labelStyle"
    >
      {expertise.name.charAt(0).toUpperCase() +
        expertise.name.slice(1).toLowerCase()}
    </CategoryLabel>
  ));

  const truncatedBackgroundDescription =
    expert.backgroundDescription && expert.backgroundDescription.slice(0, 200);

  return (
    <MDBCard className={`shadow-2-strong mb-4 ${styles.expertCard}`}>
      <MDBCardImage
        src={expert.profileImageUrl}
        alt={`${expert.firstName} ${expert.lastName} profile`}
        fluid
        className={styles.cardImage}
      />
      <MDBCardBody>
        <MDBCardTitle className={`fw-bold ${styles.cardTitle}`}>
          {`${expert.firstName} ${expert.lastName}`}
        </MDBCardTitle>
        
        <MDBTypography
          variant="subtitle1"
          className={`mb-3 ${styles.jobPosition}`}
        >
          {expert.jobPosition}
        </MDBTypography>
  
        <MDBCardText className={styles.linkedinButton}>
          {expert.linkedinUrl && (
            <MDBBtn
              href={expert.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              color="grey"
              className={styles.linkedinButton}
            >
              <FaLinkedin className={styles.linkedinButtonIcon} />
              LinkedIn
            </MDBBtn>
          )}
        </MDBCardText>
  
        <MDBCardText className={`mb-3 ${styles.cardText}`}>
          <strong>Background: </strong>
          {expert.backgroundDescription && (
            <>
              {isExpanded ? (
                <MDBCollapse show={isExpanded}>
                  <span>{expert.backgroundDescription}</span>
                </MDBCollapse>
              ) : (
                <>
                  <span>{truncatedBackgroundDescription}</span>
                  {expert.backgroundDescription.length > 200 && (
                    <MDBBtn
                      color="light"
                      size="sm"
                      className={`ms-2 py-0 ${styles.expandButton}`}
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? (
                        <FaChevronUp className={styles.expandButtonIcon} />
                      ) : (
                        <FaChevronDown className={styles.expandButtonIcon} />
                      )}
                    </MDBBtn>
                  )}
                </>
              )}
            </>
          )}
        </MDBCardText>
  
        <div className={styles.labelSection}>
          <MDBCardText className={`mb-0 ${styles.cardText}`}>
            {expertiseLabels}
            {countryLabels}
          </MDBCardText>
        </div>
      </MDBCardBody>
    </MDBCard>
  );
}
export default  ExpertCard;
