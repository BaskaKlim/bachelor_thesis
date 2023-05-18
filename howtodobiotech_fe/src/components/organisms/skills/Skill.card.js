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
import styles from "./SkillCard.module.css";

const SkillCard = ({ skillOpt }) => {
  const biotechCategoryLabels = skillOpt.biotechCategories.map((category) => (
    <CategoryLabel
      key={category.id}
      category={category}
      className="labelStyle"
    />
  ));
  const skillCategoryLabels = skillOpt.skillCategories.map((category) => (
    <CategoryLabel
      key={category.id}
      category={category}
      className="labelStyle"
    />
  ));
  const countryLabels = skillOpt.countries.map((country) => (
    <CountryLabel key={country.id} country={country} className="labelStyle" />
  ));

  const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

  return (
    <MDBCard style={{ maxWidth: "22rem" }}>
      <MDBCardBody>
        <MDBCardTitle className={styles.skillOptCardTitle}>
          {skillOpt.title}
        </MDBCardTitle>
        <div className={styles.skillOptCardOrganizer}>
          <MDBCardText>
            {" "}
            by {skillOpt.organizer}
            <div>
              {"  "}
              <WebsiteButton url={skillOpt.website} />
            </div>
          </MDBCardText>
        </div>

        <MDBCardText className={styles.skillOptCardDescription}>
          {skillOpt.description}
        </MDBCardText>

        <MDBCardText>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {biotechCategoryLabels}
            {skillCategoryLabels}
            {countryLabels}
          </div>
        </MDBCardText>
        <MDBCardFooter>
          <div>
            <MDBIcon fas icon="calendar-alt" style={{ marginRight: "10px" }} />
            <span className={styles.cskillOptCardDateContainer}>
              {new Date(skillOpt.startDate).toLocaleDateString(
                "de-DE",
                dateOptions
              )}{" "}
              -{" "}
              {new Date(skillOpt.endDate).toLocaleDateString(
                "de-DE",
                dateOptions
              )}
            </span>
          </div>
        </MDBCardFooter>
      </MDBCardBody>
    </MDBCard>
  );
};

export default SkillCard;
