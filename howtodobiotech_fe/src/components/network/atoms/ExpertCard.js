import React, { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBTypography,
  MDBCardImage,
  MDBBtn,
} from "mdb-react-ui-kit";
import {
  FaLinkedin,
  FaMapMarkerAlt,
  FaUserTie,
  FaChevronDown,
} from "react-icons/fa";

const ExpertCard = ({ expert }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const countryLabels = expert.countries.map((country) => (
    <MDBTypography key={country.id} variant="caption" className="text-muted">
      <FaMapMarkerAlt />
      {country.name.charAt(0).toUpperCase() +
        country.name.slice(1).toLowerCase()}
    </MDBTypography>
  ));

  const expertiseLabels = expert.expertises.map((expertise) => (
    <MDBTypography key={expertise.id} variant="caption" className="text-muted">
      {expertise.name.charAt(0).toUpperCase() +
        expertise.name.slice(1).toLowerCase()}
    </MDBTypography>
  ));

  return (
    <MDBCard className="shadow-2-strong mb-4">
      <MDBCardImage
        src={expert.profileImageUrl}
        alt={`${expert.firstName} ${expert.lastName} profile`}
        fluid
        className="rounded-circle p-2 bg-white"
      />
      <MDBCardBody>
        <MDBCardTitle className="fw-bold">{`${expert.firstName} ${expert.lastName}`}</MDBCardTitle>
        <MDBTypography variant="subtitle1" className="mb-3">
          <FaUserTie className="me-2" />
          {expert.jobPosition}
        </MDBTypography>
        <MDBCardText className="mb-3">
          <div className="me-2" />
          {countryLabels}
        </MDBCardText>
        <MDBCardText className="mb-3">
          <strong>Background: </strong>
          {isExpanded
            ? expert.backgroundDescription
            : `${expert.backgroundDescription.slice(0, 120)}...`}
          {!isExpanded && (
            <MDBBtn
              color="primary"
              size="sm"
              className="ms-2 py-0"
              onClick={() => setIsExpanded(true)}
            >
              <FaChevronDown />
            </MDBBtn>
          )}
        </MDBCardText>
        <MDBCardText className="mb-0">
          <strong>Expertises: </strong>
          {expertiseLabels}
        </MDBCardText>
        {expert.linkedinUrl && (
          <MDBBtn
            href={expert.linkedinUrl}
            target="_blank"
            rel="noreferrer"
            color="primary"
            className="d-flex align-items-center mt-3"
          >
            <FaLinkedin className="me-2" />
            LinkedIn
          </MDBBtn>
        )}
      </MDBCardBody>
    </MDBCard>
  );
};

export default ExpertCard;
