import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import WebsiteButton from '../../common/atoms/web.button';
import CategoryLabel from '../../common/category.label';
import CountryLabel from '../../common/country.label';

const SkillOptCard = ({ skillOpt }) => {
  const biotechCategoryLabels = skillOpt.biotechCategories.map((category) => (
    <CategoryLabel key={category.id} category={category} />
  ));
  const skillCategoryLabels = skillOpt.skillCategories.map((category) => (
    <CategoryLabel key={category.id} category={category} />
  ));
  const countryLabels = skillOpt.countries.map((country) => (
    <CountryLabel key={country.id} country={country} />
  ));

  return (
    <MDBCard style={{ maxWidth: '22rem' }}>
      <MDBCardBody>
        <MDBCardTitle>{skillOpt.title}</MDBCardTitle>
        <MDBCardText>Organizer: {skillOpt.organizer}</MDBCardText>
        <MDBCardText>{skillOpt.description}</MDBCardText>
        <MDBCardText>
          Start Date: {new Date(skillOpt.startDate).toLocaleDateString()}
        </MDBCardText>
        <MDBCardText>
          End Date: {new Date(skillOpt.endDate).toLocaleDateString()}
        </MDBCardText>
        <MDBCardText>
          <WebsiteButton url={skillOpt.website} />
        </MDBCardText>
        <MDBCardText>{biotechCategoryLabels}</MDBCardText>
        <MDBCardText>{skillCategoryLabels}</MDBCardText>
        <MDBCardText>{countryLabels}</MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};

export default SkillOptCard;
