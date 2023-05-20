import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCollapse,
  MDBBtn,
} from "mdb-react-ui-kit";
import WebsiteButton from "../../atoms/common/Web.button";
import CategoryLabel from "../../atoms/common/Category.label";
import CountryLabel from "../../atoms/common/Country.label";
import InnovationImage from "../../molecules/InnovationImage";

import styles from "./InnovationCard.module.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const Card = ({ innovation }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  let imageSrc = "";

  const categoryLabels = innovation.categories.map((category) => (
    <CategoryLabel
      key={category.id}
      category={category}
      className="labelStyle"
    />
  ));
  const countryLabels = innovation.countries.map((country) => (
    <CountryLabel key={country.id} country={country} />
  ));

  const truncatedDescription =
    innovation.description.length > 200
      ? innovation.description.substring(0, 200) + "..."
      : innovation.description;

  return (
    <MDBCard style={{ maxWidth: "22rem" }} className={styles.card}>
      <InnovationImage skillCategory={innovation.categories[0].id} />

      <MDBCardBody>
        <MDBCardTitle className={styles.cardTitle}>
          {innovation.title}
        </MDBCardTitle>
        <MDBCardText className={styles.cardButton}>
          <WebsiteButton url={innovation.website} />
        </MDBCardText>

        <MDBCardText className={`mb-3 ${styles.cardText}`}>
          {innovation.description.length > 250 && (
            <>
              {isExpanded ? (
                <MDBCollapse show={isExpanded}>
                  <span>{innovation.description}</span>
                </MDBCollapse>
              ) : (
                <>
                  <span>{truncatedDescription}</span>
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
                </>
              )}
            </>
          )}
        </MDBCardText>

        <MDBCardText
          className={`${styles.cardText} ${{
            display: "flex",
            flexWrap: "wrap",
          }}`}
        >
          {categoryLabels}
          {countryLabels}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Card;
