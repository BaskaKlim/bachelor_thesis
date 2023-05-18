import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
  MDBCardFooter,
} from "mdb-react-ui-kit";
import WebsiteButton from "../../atoms/common/Web.button";
import CategoryLabel from "../../atoms/common/Category.label";
import CountryLabel from "../../atoms/common/Country.label";
import styles from "./StartupCard.module.css";

const Card = ({ startupOpt }) => {
  const categoryLabels = startupOpt.categories.map((category) => (
    <CategoryLabel
      key={category.id}
      category={category}
      className="labelStyle"
    />
  ));
  const countryLabels = startupOpt.countries.map((country) => (
    <CountryLabel key={country.id} country={country} className="labelStyle" />
  ));

  return (
    <MDBCard style={{ maxWidth: "22rem" }}>
      <MDBCardBody>
        <MDBCardTitle className={styles.startupCardTitle}>
          {startupOpt.title}
        </MDBCardTitle>
        <div className={styles.startupCardProvider}>
          <MDBCardText>
            {" "}
            by {startupOpt.provider}
            <div>
              <WebsiteButton url={startupOpt.website} />
            </div>
          </MDBCardText>
        </div>

        <MDBCardText className={styles.startupCardDescription}>
          {startupOpt.description}
        </MDBCardText>
        <MDBCardText>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {categoryLabels}
            {countryLabels}
          </div>
        </MDBCardText>
        <MDBCardFooter>
          <div>
            <MDBIcon fas icon="calendar-alt" style={{ marginRight: "10px" }} />
            <span className={styles.cardDateContainer}>
              {new Date(startupOpt.startDate).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
              {" - "}
              {new Date(startupOpt.endDate).toLocaleDateString("de-DE", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </span>
          </div>
        </MDBCardFooter>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Card;
