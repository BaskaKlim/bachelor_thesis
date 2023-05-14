import React from 'react';
import { MDBBadge } from 'mdb-react-ui-kit';
import styles from './Label.module.css'

const CountryLabel = ({ country }) => {
  return (
    <MDBBadge bg="secondary" className={styles.labelStyle}>{country.name}</MDBBadge>
  );
};

export default CountryLabel;
