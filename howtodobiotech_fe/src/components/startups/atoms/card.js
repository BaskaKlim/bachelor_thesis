import React from 'react';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText } from 'mdb-react-ui-kit';
import WebsiteButton from '../../common/atoms/Web.button';
import CategoryLabel from '../../common/atoms/Category.label';
import CountryLabel from '../../common/atoms/Country.label';

const Card = ({ startupOpt }) => {
  const categoryLabels = startupOpt.categories.map((category) => <CategoryLabel key={category.id} category={category} />);
  const countryLabels = startupOpt.countries.map((country) => <CountryLabel key={country.id} country={country} />);

  return (
    <MDBCard style={{ maxWidth: '22rem' }}>
      <MDBCardBody>
        <MDBCardTitle>{startupOpt.title}</MDBCardTitle>
        <MDBCardText>{startupOpt.description}</MDBCardText>
        <MDBCardText>
          <WebsiteButton url={startupOpt.website} />
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
