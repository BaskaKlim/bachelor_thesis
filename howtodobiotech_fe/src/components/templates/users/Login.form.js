import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import authService from "../../../service/Auth.servise";

const Login = () => {
  const history = useHistory();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsSubmitting(true);
        const response = await authService.login(values);
        console.log("Login successful!");
        history.push("/skills"); // Redirect to the dashboard page
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Invalid username or password. Please try again.");
        setIsSubmitting(false);
      }
    },
  });

  return (
    <MDBContainer>
      <MDBRow className="justify-content-center">
        <MDBCol md="6">
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={formik.handleSubmit}>
                <h4 className="text-center mb-4">Log in to your account</h4>

                <div className="form-outline mb-4">
                  <MDBInput
                    type="text"
                    id="username"
                    name="username"
                    label="Username"
                    {...formik.getFieldProps("username")}
                    invalid={formik.touched.username && formik.errors.username}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className="invalid-feedback">
                      {formik.errors.username}
                    </div>
                  )}
                </div>

                <div className="form-outline mb-4">
                  <MDBInput
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    {...formik.getFieldProps("password")}
                    invalid={formik.touched.password && formik.errors.password}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="invalid-feedback">
                      {formik.errors.password}
                    </div>
                  )}
                </div>

                <div className="d-flex justify-content-between">
                  <MDBBtn
                    color="primary"
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Log in"}
                  </MDBBtn>
                  <a href="/forgot-password">Forgot password?</a>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default Login;
