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
import SkillCategoryLabel from "../../atoms/common/SkillCategoryLabel";
import SkillImage from "../../molecules/SkillImage";
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
    <SkillCategoryLabel
  key={category.id}
  id={category.id}
  className="customLabelStyle"
/>

  ));
  
  const countryLabels = skillOpt.countries.map((country) => (
    <CountryLabel key={country.id} country={country} className="labelStyle" />
  ));

  const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

  let imageSrc = "";

  if (skillOpt.skillCategories.length > 0) {
    const skillCategory = skillOpt.skillCategories[0].id;

    switch (skillCategory) {
      case 1:
        imageSrc = "/assets/energy.jpg";
        break;
      case 2:
        imageSrc = "/assets/school.png";
        break;
      case 3:
        imageSrc = "/assets/conference.png";
        break;
      case 4:
        imageSrc = "/assets/conference.png";
        break;
      case 5:
        imageSrc = "/assets/intership.png";
        break;
      case 6:
        imageSrc = "/assets/academy.png";
        break;
      case 7:
        imageSrc = "/assets/hackathon.png";
        break;
      default:
        imageSrc = "/assets/workshop.jpg";
        break;
    }
  }

  return (
    <MDBCard style={{ maxWidth: "22rem" }} className={styles.skillCard}>
      <SkillImage skillCategory={skillOpt.skillCategories[0].id} />

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
      </MDBCardBody>
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
    </MDBCard>
  );
};

export default SkillCard;
