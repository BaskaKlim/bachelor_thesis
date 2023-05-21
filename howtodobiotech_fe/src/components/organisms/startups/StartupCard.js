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
import StartupImage from "../../molecules/startups/StartupImage";

import styles from "./StartupCard.module.css";

const StartupCard = ({ startupOpt }) => {
  let imageSrc = "";

  const biotechCategoryLabels = (startupOpt?.biotechCategories || []).map(
    (biotechCategory) => (
      <CategoryLabel
        key={biotechCategory.id}
        category={biotechCategory}
        className="labelStyle"
      />
    )
  );

  const supportCategoryLabels = (startupOpt?.supportCategories || []).map(
    (supportCategory) => (
      <CategoryLabel
        key={supportCategory.id}
        category={supportCategory}
        className="labelStyle"
      />
    )
  );

  const countryLabels = (startupOpt?.countries || []).map((country) => (
    <CountryLabel key={country.id} country={country} className="labelStyle" />
  ));

  const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" };

  if (startupOpt?.supportCategories?.length > 0) {
    const supportCategory = startupOpt.supportCategories[0].id;

    switch (supportCategory) {
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
    <MDBCard style={{ maxWidth: "22rem" }} className={styles.startupCard}>
      <StartupImage supportCategory={startupOpt?.supportCategories?.[0]?.id} />
      <MDBCardBody>
        <MDBCardTitle className={styles.startupCardTitle}>
          {startupOpt?.title}
        </MDBCardTitle>
        <div className={styles.startupCardProvider}>
          <MDBCardText>
            {" "}
            by {startupOpt?.provider}
            <div>
              <WebsiteButton url={startupOpt?.website} />
            </div>
          </MDBCardText>
        </div>
        <MDBCardText className={styles.startupCardDescription}>
          {startupOpt?.description}
        </MDBCardText>
        <MDBCardText>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {biotechCategoryLabels}
            {supportCategoryLabels}
            {countryLabels}
          </div>
        </MDBCardText>
      </MDBCardBody>
      <MDBCardFooter>
        <div>
          <MDBIcon fas icon="calendar-alt" style={{ marginRight: "10px" }} />
          <span className={styles.cskillOptCardDateContainer}>
            {startupOpt && new Date(startupOpt.startDate).toLocaleDateString(
              "de-DE",
              dateOptions
            )}{" "}
            -{" "}
            {startupOpt && new Date(startupOpt.endDate).toLocaleDateString(
              "de-DE",
              dateOptions
            )}
          </span>
        </div>
      </MDBCardFooter>
    </MDBCard>
  );
};

export default StartupCard;
