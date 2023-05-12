import React from 'react';
import { MDBBadge } from 'mdb-react-ui-kit';
import styles from './Label.module.css'

const CategoryLabel = ({ category }) => {
  return (
    <MDBBadge bg="secondary" className={styles.labelStyle}>{category.name}</MDBBadge>
  );
};

export default CategoryLabel;
