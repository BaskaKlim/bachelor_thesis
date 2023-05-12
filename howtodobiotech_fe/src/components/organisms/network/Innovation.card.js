import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import WebsiteButton from '../../atoms/common/Web.button'
import CategoryLabel from '../../atoms/common/Category.label';
import CountryLabel from '../../atoms/common/Country.label';

const Card = ({ innovation }) => {
  const categoryLabels = Array.isArray(innovation.biotechCategories)
  ? [...innovation.biotechCategories, ...innovation.skillCategories].map((category) => (
      <CategoryLabel key={category.id} category={category} />
    ))
  : null;
  const countryLabels = innovation.countries.map((country) => <CountryLabel key={country.id} country={country} />);

  return (
    <MDBCard style={{ maxWidth: '22rem' }}>
      <MDBCardBody>
        <MDBCardTitle>{innovation.title}</MDBCardTitle>
        <MDBCardText>{innovation.description}</MDBCardText>
        <MDBCardText>
          <WebsiteButton url={innovation.website} />
        </MDBCardText>
        <MDBCardText>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {categoryLabels}
          </div>
        </MDBCardText>
        <MDBCardText>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {countryLabels}
          </div>
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Card;

