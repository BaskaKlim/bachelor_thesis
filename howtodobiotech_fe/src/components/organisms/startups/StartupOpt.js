import React, { Component } from "react";
import { connect } from "react-redux";
import { updateStartupOpt, deleteStartupOpt } from "../../../actions/startups";
import StartupOptDataService from "../../../service/Startup.service";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
} from "mdb-react-ui-kit";

import CountryLabel from "../../atoms/common/Country.label";
import CategoryLabel from "../../atoms/common/Category.label";
import styles from "./StartupOpt.module.css";

const categoryOptions = [
  {
    id: 1,
    name: "MEDICINE",
    imageUrl: "/assets/medicine.jpg",
    color: "#E35149",
  },
  {
    id: 2,
    name: "BIOINFORMATICS",
    imageUrl: "/assets/bioinformatics.jpg",
    color: "#110777",
  },
  { id: 3, name: "ENERGY", imageUrl: "/assets/energy.jpg", color: "#7369ff" },
  { id: 4, name: "FOOD", imageUrl: "/assets/food.jpg", color: "#FF928F" },
  {
    id: 5,
    name: "ENVIRONMENTAL",
    imageUrl: "/assets/environmental.jpg",
    color: "#91B3FA",
  },
  {
    id: 6,
    name: "AGRICULTURE",
    imageUrl: "/assets/agriculture.jpg",
    color: "#A22B25",
  },
  { id: 7, name: "MARINE", imageUrl: "/assets/marine.jpg", color: "#4B4DF7" },
];
class StartupOpt extends Component {
  constructor(props) {
    super(props);

    this.state = {
      startupOpt: null,
    };
  }

  componentDidMount() {
    this.getStartupOptById(this.props.match.params.id);
  }
  getStartupOptById(id) {
    StartupOptDataService.getStartupOptById(id)
      .then((response) => {
        this.setState({ startupOpt: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  updateStartupOpt = () => {
    const { startupOpt } = this.state;
    this.props
      .updateStartupOpt(startupOpt.id, startupOpt)
      .then(() => {
        this.props.history.push("/startup-opportunities");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  deleteStartupOpt = () => {
    const { startupOpt } = this.state;
    this.props
      .deleteStartupOpt(startupOpt.id)
      .then(() => {
        this.props.history.push("/startup-opportunities");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  makeChanges = () => {
    const { startupOpt } = this.state;
    this.props.history.push(`/startup-opportunities/update/${startupOpt.id}`);
  };

  goBack = () => {
    const { startupOpt } = this.state;
    this.props.history.push(`/startup-opportunities/${startupOpt.id}`);
  };

  render() {
    const { startupOpt } = this.state;

    const biotechCategory =
      startupOpt &&
      startupOpt.biotechCategories &&
      startupOpt.biotechCategories[0];

    const selectedCategoryOption = categoryOptions.find(
      (option) => biotechCategory && option.name === biotechCategory.name
    );

    const imageUrl = selectedCategoryOption
      ? selectedCategoryOption.imageUrl
      : "";

    return (
      <MDBContainer fluid="true">
        <MDBCard className={`${styles.textBlack} ${styles.registrationCard}`}>
          <div className={styles.introText} fluid="true">
            <MDBCardTitle className={styles.heading}>
              Detail information
            </MDBCardTitle>
            <MDBCol className={styles.textCenter}>
              See detail information about startup support you provided. You can
              easily keep updated your information or delete select support by
              clicking on update option.
            </MDBCol>
          </div>

          <MDBCardBody>
            <MDBRow>
              <MDBCol md="6" className={styles.card}>
                {startupOpt && (
                  <div>
                    <MDBRow>
                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Title</label>
                          <div className={styles.value}>{startupOpt.title}</div>
                        </div>
                      </MDBCol>
                     
                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Provider</label>
                          <div className={styles.provider}>
                            {startupOpt.provider}
                          </div>
                        </div>
                      </MDBCol>
                     
                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Start Date</label>
                          <div className={styles.dateValue}>
                            {startupOpt.startDate}
                          </div>
                        </div>
                      </MDBCol>
                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>End Date</label>
                          <div className={styles.dateValue}>
                            {startupOpt.endDate}
                          </div>
                        </div>
                      </MDBCol>
                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Website</label>
                          <div className={styles.website}>
                            <FontAwesomeIcon icon={faGlobe} />
                          </div>
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <div className={styles.inputWrapper}>
                      <label className={styles.label}>Description</label>
                      <div className={styles.value}>
                        {startupOpt.description}
                      </div>
                    </div>

                    <MDBRow>
                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Countries</label>
                          <div className={styles.value}>
                            {startupOpt.countries.map((country) => (
                              <CountryLabel
                                key={country.id}
                                country={country}
                              />
                            ))}
                          </div>
                        </div>
                      </MDBCol>

                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Categories</label>
                          <div className={styles.value}>
                            {startupOpt.biotechCategories.map((category) => (
                              <CategoryLabel
                                key={category.id}
                                category={category}
                              />
                            ))}
                          </div>
                        </div>
                      </MDBCol>

                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>
                            Type of support
                          </label>
                          <div className={styles.value}>
                            {startupOpt.supportCategories.map((category) => (
                              <CategoryLabel
                                key={category.id}
                                category={category}
                              />
                            ))}
                          </div>
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <button
                      onClick={this.makeChanges}
                      className={styles.btnUpdate}
                    >
                      Make Changes
                    </button>
                  </div>
                )}
              </MDBCol>
              <MDBCol
                md="10"
                lg="6"
                className={`${styles.order1} ${styles.orderLg2} ${styles.alignItemsCenter}`}
              >
                <div className={styles.registrationImage}>
                  <MDBCardImage src={imageUrl} fluid="true" />
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
  startupOpts: state.startupOpts,
});

export default connect(mapStateToProps, { updateStartupOpt, deleteStartupOpt })(
  StartupOpt
);
