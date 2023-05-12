import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBTypography } from "mdb-react-ui-kit";

const NotFoundPage = ({ title, text }) => {
  return (
    <MDBContainer className="my-5">
      <MDBRow className="justify-content-center">
        <MDBCol md="6" className="text-center">
          <img src="/assets/404.jpg" alt="404" className="img-fluid" />
          <MDBTypography tag="h2" variant="h2" className="my-4">
            {title}
          </MDBTypography>
          <MDBTypography tag="p" variant="p">
            {text}
          </MDBTypography>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default NotFoundPage;
