import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import { register } from "../../../actions/auth";
import { useHistory } from "react-router-dom";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import styles from "./RegistrationForm.module.css";
import authService from "../../../service/Auth.servise";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegistrationForm = () => {
  const [registrationStatus, setRegistrationStatus] = useState(null);
  const history = useHistory();

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required("Name of account is mandatory")
      .min(3, "Name should be at least 3 characters long")
      .max(14, "Name should not exceed 14 characters"),
    description: Yup.string()
      .required("Description of organization is mandatory")
      .max(400, "Description should not exceed 400 characters"),
    url: Yup.string().required("Website of organization is mandatory"),
    email: Yup.string()
      .required("Email is mandatory")
      .email("Email needs to be in correct format"),
    username: Yup.string()
      .required("Username is mandatory")
      .min(3, "Username should be at least 3 characters long")
      .max(14, "Username should not exceed 14 characters"),
    password: Yup.string()
      .min(10, "Password should be minimum 10 characters or numbers long"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      url: "",
      email: "",
      username: "",
      password: "",
      newsletter: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await authService.register(values);

        setRegistrationStatus("success");
        alert("Registration successful!");
        history.push("/login");
      } catch (error) {
        setRegistrationStatus("error");
        alert("Registration error. Please try again.");
      }
    },
  });

  return (
    <MDBContainer fluid>
      <ToastContainer />
      <MDBCard className={`${styles.textBlack} ${styles.registrationCard}`}>
        <div className={styles.introText}>
          <MDBCardTitle className={styles.title}>
            Sign up your organization
          </MDBCardTitle>
          <MDBCol className={styles.textCenter}>
            Register your organization now to unlock limitless opportunities for
            growth and collaboration. Join our community, attract scientific
            talent.
          </MDBCol>
        </div>

        <MDBCardBody>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className={`${styles.order2} ${styles.orderLg1} ${styles.flexColumn} ${styles.alignItemsCenter}`}
            >
              <form
                className={styles.registrationForm}
                onSubmit={formik.handleSubmit}
              >
                <div className={`${styles.flexRow} ${styles.alignItemsCenter} ${styles.mb6}`}>
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    label=""
                    id="form1"
                    type="text"
                    className={`${styles.w100} ${
                      formik.touched.username && formik.errors.username
                        ? styles.invalid
                        : ""
                    }`}
                    placeholder="Create username"
                    {...formik.getFieldProps("username")}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className={styles.error}>{formik.errors.username}</div>
                  )}
                </div>

                <div className={`${styles.flexRow} ${styles.alignItemsCenter} ${styles.mb4}`}>
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label=""
                    id="form2"
                    type="email"
                    className={`${styles.w100} ${
                      formik.touched.email && formik.errors.email
                        ? styles.invalid
                        : ""
                    }`}
                    placeholder="Your Email"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className={styles.error}>{formik.errors.email}</div>
                  )}
                </div>

                <div className={`${styles.flexRow} ${styles.alignItemsCenter} ${styles.mb4}`}>
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    label=""
                    id="form3"
                    type="password"
                    className={`${styles.w100} ${
                      formik.touched.password && formik.errors.password
                        ? styles.invalid
                        : ""
                    }`}
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className={styles.error}>{formik.errors.password}</div>
                  )}
                </div>

                <div className={`${styles.flexRow} ${styles.alignItemsCenter} ${styles.mb4}`}>
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    label=""
                    id="form4"
                    type="name"
                    className={`${styles.w100} ${
                      formik.touched.name && formik.errors.name
                        ? styles.invalid
                        : ""
                    }`}
                    placeholder="Organization name"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className={styles.error}>{formik.errors.name}</div>
                  )}
                </div>

                <div className={`${styles.flexRow} ${styles.alignItemsCenter} ${styles.mb4}`}>
                  <MDBIcon fas icon="link me-3" size="lg" />
                  <MDBInput
                    label=""
                    id="form5"
                    type="text"
                    className={`${styles.w100} ${
                      formik.touched.url && formik.errors.url
                        ? styles.invalid
                        : ""
                    }`}
                    placeholder="Website"
                    {...formik.getFieldProps("url")}
                  />
                  {formik.touched.url && formik.errors.url && (
                    <div className={styles.error}>{formik.errors.url}</div>
                  )}
                </div>

                <div className={`${styles.flexRow} ${styles.alignItemsCenter} ${styles.mb4}`}>
                  <MDBIcon fas icon="align-left me-3" size="lg" />
                  <MDBInput
                    label=""
                    id="form6"
                    type="text"
                    className={`${styles.w100} ${styles.widerInput} ${
                      formik.touched.description && formik.errors.description
                        ? styles.invalid
                        : ""
                    }`}
                    placeholder="Introduce your organization. Up to 500 characters."
                    {...formik.getFieldProps("description")}
                  />
                  {formik.touched.description && formik.errors.description && (
                    <div className={styles.error}>{formik.errors.description}</div>
                  )}
                </div>

                <div className={`${styles.mb4} ${styles.check}`}>
                  <MDBCheckbox
                    name="newsletter"
                    value=""
                    id="flexCheckDefault"
                    label="Subscribe to our newsletter"
                    {...formik.getFieldProps("newsletter")}
                  />
                </div>

                {registrationStatus === "success" && (
                  <div className={`${styles.successMessage} ${styles.mb2}`}>
                    Registration successful!
                  </div>
                )}
                {registrationStatus === "error" && (
                  <div className={`${styles.errorMessage} ${styles.mb2}`}>
                    Registration error. Please try again.
                  </div>
                )}

                <button
                  className={`${styles.mb4} ${styles.registrationSubmitBtn}`}
                  size="lg"
                  type="submit"
                >
                  Register
                </button>
              </form>
            </MDBCol>

            <MDBCol
              md="10"
              lg="6"
              className={`${styles.order1} ${styles.orderLg2} ${styles.alignItemsCenter}`}
            >
              <div className={styles.registrationImage}>
                <MDBCardImage src="/assets/registration.jpg" fluid />
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

const mapDispatchToProps = {
  register,
};

export default connect(null, mapDispatchToProps)(RegistrationForm);
