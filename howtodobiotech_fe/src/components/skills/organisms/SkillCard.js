import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
  MDBCardFooter,
  MDBCardImage
} from "mdb-react-ui-kit";
import WebsiteButton from "../../common/atoms/Web.button";
import CategoryLabel from "../../common/atoms/Category.label";
import CountryLabel from "../../common/atoms/Country.label";
import styles from "./SkillCard.module.css";

const SkillOptCard = ({ skillOpt }) => {
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
        <div class={styles.skillOptCardOrganizer}>
          <MDBCardText>
            {" "}
            by {skillOpt.organizer}
            <span>
              {"  "}
              <WebsiteButton url={skillOpt.website} />
            </span>
          </MDBCardText>
        </div>

        <MDBCardText class={styles.skillOptCardDescription}>
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
            <span class={styles.cskillOptCardDateContainer}>
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

export default SkillOptCard;
