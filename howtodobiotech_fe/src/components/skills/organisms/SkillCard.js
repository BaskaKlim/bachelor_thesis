import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBIcon } from 'mdb-react-ui-kit';
import WebsiteButton from '../../common/atoms/web.button';
import CategoryLabel from '../../common/atoms/Category.label';
import CountryLabel from '../../common/atoms/Country.label';

const SkillOptCard = ({ skillOpt }) => {
  const biotechCategoryLabels = skillOpt.biotechCategories.map((category) => (
    <CategoryLabel key={category.id} category={category} className="labelStyle" />
  ));
  const skillCategoryLabels = skillOpt.skillCategories.map((category) => (
    <CategoryLabel key={category.id} category={category} className="labelStyle" />
  ));
  const countryLabels = skillOpt.countries.map((country) => (
    <CountryLabel key={country.id} country={country} className="labelStyle" />
  ));

  const dateOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };

  return (
    <MDBCard style={{ maxWidth: '22rem' }}>
      <MDBCardBody>
        <MDBCardTitle>{skillOpt.title}</MDBCardTitle>
        <MDBCardText>Organizer: {skillOpt.organizer}</MDBCardText>
        <MDBCardText>{skillOpt.description}</MDBCardText>
        
        <MDBCardText>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <MDBIcon fas icon="calendar-alt" style={{ marginRight: '10px' }}/>
            <span style={{ backgroundColor: '#f2f2f2', padding: '5px', borderRadius: '5px' }}>
              {new Date(skillOpt.startDate).toLocaleDateString('de-DE', dateOptions)} - {new Date(skillOpt.endDate).toLocaleDateString('de-DE', dateOptions)}
            </span>
          </div>
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