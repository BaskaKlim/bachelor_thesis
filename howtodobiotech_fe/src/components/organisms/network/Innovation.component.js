import React, { Component } from "react";
import { connect } from "react-redux";
import {
  MDBContainer,
  MDBRow,
  MDBBtn,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import {
  updateInnovation,
  deleteInnovation,
} from "../../../actions/innovations";
import InnovationDataService from "../../../service/innovation.service";
import CountryLabel from "../../atoms/common/Country.label";
import CategoryLabel from "../../atoms/common/Category.label";
import styles from "./InnovationComponent.module.css";

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
class Innovation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      innovation: null,
    };
  }

  componentDidMount() {
    this.getInnovationById(this.props.match.params.id);
  }

  getInnovationById(id) {
    InnovationDataService.getInnovationById(id)
      .then((response) => {
        this.setState({ innovation: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  updateInnovation = () => {
    const { innovation } = this.state;
    this.props
      .updateInnovation(innovation.id, innovation)
      .then(() => {
        this.props.history.push("/innovations/update/" + innovation.id);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  deleteInnovation = () => {
    const { innovation } = this.state;
    this.props
      .deleteInnovation(innovation.id)
      .then(() => {
        this.props.history.push("/innovations");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  makeChanges = () => {
    const { innovation } = this.state;
    this.props.history.push(`/innovations/update/${innovation.id}`);
  };

  goBack = () => {
    const { innovation } = this.state;
    this.props.history.push(`/innovations//${innovation.id}`);
  };

  render() {
    const { innovation } = this.state;
    // Find the category object for the innovation
    const category =
      innovation && innovation.categories && innovation.categories[0];
    // Find the corresponding category option with the matching name
    const selectedCategoryOption = categoryOptions.find(
      (option) => category && option.name === category.name
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
              See detail information about innovative product or service. You
              can easily keep updated your information or delete select
              innovation by clicking on update option.
            </MDBCol>
          </div>

          <MDBCardBody>
            <MDBRow>
              <MDBCol md="6" className={styles.card}>
                {innovation && (
                  <div>
                    <MDBRow>
                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Title</label>
                          <div className={styles.value}>{innovation.title}</div>
                        </div>
                      </MDBCol>
                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Website</label>
                          <div className={styles.value}>
                            {innovation.website}
                          </div>
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <div className={styles.inputWrapper}>
                      <label className={styles.label}>Description</label>
                      <div className={styles.value}>
                        {innovation.description}
                      </div>
                    </div>
                    

                    <MDBRow>
                      <MDBCol md="6">
                        <div className={styles.inputWrapper}>
                          <label className={styles.label}>Countries</label>
                          <div className={styles.value}>
                            {innovation.countries.map((country) => (
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
                            {innovation.categories.map((category) => (
                              <CategoryLabel
                                key={category.id}
                                category={category}
                              />
                            ))}
                          </div>
                        </div>
                      </MDBCol>
                    </MDBRow>
                    <MDBBtn onClick={this.makeChanges} className={styles.btnUpdate}>
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
  innovations: state.innovations,
});

export default connect(mapStateToProps, { updateInnovation, deleteInnovation })(
  Innovation
);
