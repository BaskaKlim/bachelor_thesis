import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput, MDBBtn, MDBCardImage } from "mdb-react-ui-kit";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./LoginForm.module.css";
import Cookies from "js-cookie";


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
        
        // Retrieve the JWT token from the cookie
        const authToken = Cookies.get("jwtCookie");
    
        // Store the token in the local storage
        window.localStorage.setItem("authToken", authToken);
    
        console.log("Login successful!");
        history.push("/skills");
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Invalid username or password.");
      } finally {
        setIsSubmitting(false);
      }
    },
    
  });

  return (
    <MDBContainer fluid="true">
      <ToastContainer />
      <div className={`${styles.textBlack} ${styles.loginCard}`}>
      <MDBCard >
        <MDBCardBody>
          <div  className={`justify-content-center ${styles.loginRow}`}>
          <MDBRow>
            <MDBCol
              md="10"
              lg="6"
              className={`${styles.order2} ${styles.orderLg1} ${styles.flexColumn} ${styles.alignItemsCenter}`}
            >
              <form className={styles.loginForm} onSubmit={formik.handleSubmit}>
                <h3 className={`${styles.title} text-center mb-4`}>
                  Log in to your account
                </h3>
  
                <div className={`form-outline mb-4 ${styles.loginFormOutline}`}>
                  <MDBInput
                    type="text"
                    id="username"
                    name="username"
                    label="Username"
                    {...formik.getFieldProps("username")}
                    invalid={formik.touched.username && formik.errors.username}
                    className={styles.loginInput}
                  />
                  {formik.touched.username && formik.errors.username && (
                    <div className={`invalid-feedback ${styles.errorFeedback}`}>
                      {formik.errors.username}
                    </div>
                  )}
                </div>
  
                <div className={`form-outline mb-4 ${styles.loginFormOutline}`}>
                  <MDBInput
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    {...formik.getFieldProps("password")}
                    invalid={formik.touched.password && formik.errors.password}
                    className={styles.loginInput}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className={`invalid-feedback ${styles.errorFeedback}`}>
                      {formik.errors.password}
                    </div>
                  )}
                </div>
  
                <div
                  className={`d-flex justify-content-between ${styles.loginActions}`}
                >
                  <MDBBtn
                    color="primary"
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}
                    className={styles.loginButton}
                  >
                    {isSubmitting ? "Logging in..." : "Log in"}
                  </MDBBtn>
                  <a
                    href="/forgot-password"
                    className={styles.forgotPasswordLink}
                  >
                    Forgot password?
                  </a>
                </div>
              </form>
            </MDBCol>
            <MDBCol
              md="10"
              lg="6"
              className={`${styles.order1} ${styles.orderLg2} ${styles.alignItemsCenter}`}
            >
              <div className={styles.registrationImage}>
                <MDBCardImage src="/assets/login.jpg" fluid="true" />
              </div>
            </MDBCol>
          </MDBRow>
          </div>
        
        </MDBCardBody>
      </MDBCard>
      </div>
    </MDBContainer>
  );
  
  
};
export default Login;