import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import WebsiteButton from '../../common/atoms/Web.button'
import CategoryLabel from '../../common/atoms/Category.label';
import CountryLabel from '../../common/atoms/Country.label';

const Card = ({ innovation }) => {
  const categoryLabels = [...innovation.biotechCategories, ...innovation.skillCategories].map((category) => (
    <CategoryLabel key={category.id} category={category} />
  ));
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

