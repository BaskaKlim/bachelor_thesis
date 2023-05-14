import React, { Component } from "react";
import { connect } from "react-redux";
import {
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import { updateAccount, deleteAccount } from "../../../actions/account";
import AccountService from "../../../service/Account.service";
import styles from "./AccountComponent.module.css";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
    };
  }

  componentDidMount() {
    this.getAccountById(this.props.match.params.id);
  }

  getAccountById(id) {
    AccountService.getAccountById(id)
      .then((response) => {
        this.setState({ account: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateAccount = () => {
    const { account } = this.state;
    this.props
      .updateAccount(account.id, account)
      .then(() => {
        this.props.history.push("/accounts/update/" + account.id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  makeChanges = () => {
    const { account } = this.state;
    this.props.history.push(`/accounts/update/${account.id}`);
  };

  render() {
    const { account } = this.state;

    return (
      <MDBContainer fluid>
        <MDBCard className={`${styles.textBlack} ${styles.registrationCard}`}>
          <div className={styles.introText}>
            <MDBCardTitle className={styles.heading}>
              Account Details
            </MDBCardTitle>
            <MDBCol className={styles.textCenter}>
              View detailed information about the account. You can easily update
              or delete the selected account.
            </MDBCol>
          </div>

          <MDBCardBody>
            <MDBRow>
              <MDBCol md="6" className={styles.card}>
                {account && (
                  <div>
                    <div className={styles.inputWrapper}>
                      <label className={styles.label}>Name</label>
                      <div className={styles.value}>{account.name}</div>
                    </div>
                    <div className={styles.inputWrapper}>
                      <label className={styles.label}>Description</label>
                      <div className={styles.value}>{account.description}</div>
                    </div>
                    <div className={styles.inputWrapper}>
                      <label className={styles.label}>Website</label>
                      <div className={styles.value}>{account.url}</div>
                    </div>
                    <div className={styles.inputWrapper}>
                      <label className={styles.label}>Email</label>
                      <div className={styles.value}>{account.email}</div>
                    </div>
                    <div className={styles.inputWrapper}>
                      <label className={styles.label}>Username</label>
                      <div className={styles.value}>{account.username}</div>
                    </div>
                    <div className={styles.inputWrapper}>
                      <label className={styles.label}>Password</label>
                      <div className={styles.value}> {account.password}</div>
                    </div>
                    <MDBBtn
                      onClick={this.makeChanges}
                      className={styles.btnUpdate}
                    >
                      Make Changes
                    </MDBBtn>
                  </div>
                )}
              </MDBCol>
              <MDBCol
                md="10"
                lg="6"
                className={`${styles.order1} ${styles.orderLg2} ${styles.alignItemsCenter}`}
              >
                <div className={styles.registrationImage}>
                  {/* Render account image here */}
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    );
  }
}
const mapStateToProps = (state) => ({
  accounts: state.accounts,
});

export default connect(mapStateToProps, { updateAccount, deleteAccount })(
  Account
);
