import React from 'react';
import { MDBBadge } from 'mdb-react-ui-kit';

const CategoryLabel = ({ category }) => {
  return (
    <MDBBadge bg="secondary">{category.name}</MDBBadge>
  );
};

export default CategoryLabel;
