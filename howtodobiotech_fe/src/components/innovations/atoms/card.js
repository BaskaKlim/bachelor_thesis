import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import WebsiteButton from '../../common/atoms/web.button'
import CategoryLabel from '../../common/category.label';
import CountryLabel from '../../common/country.label';

const Card = ({ innovation }) => {
  const categoryLabels = innovation.categories.map((category) => <CategoryLabel key={category.id} category={category} />);
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
          {categoryLabels}
        </MDBCardText>
        <MDBCardText>
         {countryLabels}
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
  );
};

export default Card;
