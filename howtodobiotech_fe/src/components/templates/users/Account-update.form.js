import React, { Component } from "react";
import { connect } from "react-redux";
import { updateAccount } from "../../../actions/account";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";

class AccountUpdateForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updatedName: "",
      updatedDescription: "",
      updatedUrl: "",
      updatedEmail: "",
      updatedUsername: "",
      updatedPassword: "",
      updatedNewsletter: false,
    };
  }

  handleInputChange = (event) => {
    const { id, value } = event.target;
    this.setState({ [id]: value });
  };
  updateProfile = () => {
    const {
      updatedName,
      updatedEmail,
      updatedPassword,
      updatedUrl,
      updatedUsername,
      updatedDescription,
    } = this.state;
  
    const userId = localStorage.getItem("userId");
    const updatedUser = {
      id: userId,
      name: updatedName,
      url: updatedUrl,
      description: updatedDescription,
      username: updatedUsername,
      email: updatedEmail,
      password: updatedPassword,
    };

    this.props.updateAccount(updatedUser)
      .then((response) => {
        console.log("Update response:", response);
      })
      .catch((error) => {
        console.log("Update error:", error);
        console.log("Update response:", updatedUser);
      });
  };
  
  render() {
    const {
      updatedName,
      updatedDescription,
      updatedUrl,
      updatedEmail,
      updatedUsername,
      updatedPassword,
      updatedNewsletter,
    } = this.state;

    return (
      <MDBContainer>
        <MDBRow className="justify-content-center">
          <MDBCol md="6">
            <MDBCard>
              <MDBCardBody>
                <h3 className="text-center">Update Profile</h3>
                <MDBInput
                  label="Name"
                  id="updatedName"
                  type="text"
                  value={updatedName}
                  onChange={this.handleInputChange}
                />
                <MDBInput
                  label="Description"
                  id="updatedDescription"
                  type="text"
                  value={updatedDescription}
                  onChange={this.handleInputChange}
                />
                <MDBInput
                  label="URL"
                  id="updatedUrl"
                  type="text"
                  value={updatedUrl}
                  onChange={this.handleInputChange}
                />
                <MDBInput
                  label="Email"
                  id="updatedEmail"
                  type="email"
                  value={updatedEmail}
                  onChange={this.handleInputChange}
                />
                <MDBInput
                  label="Username"
                  id="updatedUsername"
                  type="text"
                  value={updatedUsername}
                  onChange={this.handleInputChange}
                />
                <MDBInput
                  label="Password"
                  id="updatedPassword"
                  type="password"
                  value={updatedPassword}
                  onChange={this.handleInputChange}
                />
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="updatedNewsletter"
                    checked={updatedNewsletter}
                    onChange={(e) =>
                      this.setState({
                        updatedNewsletter: e.target.checked,
                      })
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="updatedNewsletter"
                  >
                    Newsletter
                  </label>
                </div>
                <MDBBtn color="primary" onClick={this.updateProfile}>
                  Update
                </MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.account.user,
});
export default connect(mapStateToProps, { updateAccount })(AccountUpdateForm);
