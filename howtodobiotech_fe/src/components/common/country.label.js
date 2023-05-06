import React from 'react';
import { MDBBadge } from 'mdb-react-ui-kit';

const CountryLabel = ({ country }) => {
  return (
    <MDBBadge bg="success">{country.name}</MDBBadge>
  );
};

export default CountryLabel;
