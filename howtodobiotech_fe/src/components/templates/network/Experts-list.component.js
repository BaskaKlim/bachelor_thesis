import React, { Component } from "react";
import { connect } from "react-redux";
import { updateExpert, deleteExpert } from "../../../actions/experts";
import ExpertDataService from "../../../service/ExpertDataService";
import ExpertCard from "../../organisms/network/Expert.card";
import styles from "./ExpertList.module.css";
import NotFoundPage from "../../organisms/common/NotFoundPage.component";

const expertiseOptions = [
  { id: 1, name: "BUSINESS_DEVELOPMENT", color: "#E35149" },
  { id: 2, name: "LIFE_SCIENCE", color: "#A22B25" },
  { id: 3, name: "CHEMISTRY", color: "#110777" },
  { id: 4, name: "BIOLOGY", color: "#E35149" },
  { id: 5, name: "BIOINFORMATICS", color: "#7369ff" },
  { id: 6, name: "DATA_SCIENCE", color: "#E35149" },
  { id: 7, name: "LEGAL", color: "#4B4DF7" },
  { id: 8, name: "MVP_PRTOTOTYPING", color: "#E35149" },
  { id: 9, name: "BUSINESS_VALIDATION", color: "#E35149" },
  { id: 10, name: "PRODUCT_DESING", color: "#E35149" },
  { id: 11, name: "CLINICAL_TRIAL", color: "#FF928F" },
  { id: 12, name: "FINANCE", color: "#91B3FA" },
];

class ExpertList extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      experts: [],
      filteredExperts: [],
      currentPage: 1,
      expertsPerPage: 6,
    };
  }
  
  filterByExpertise = (expertise) => {
    const filteredExperts = this.state.experts.filter((expert) =>
      expert.expertises.some(
        (expertiseObj) =>
          expertiseObj.name.toLowerCase() === expertise.toLowerCase()
      )
    );
    this.setState({ filteredExperts });
  };

  showAllExperts = () => {
    this.setState({ filteredExperts: this.state.experts });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  componentDidMount() {
    ExpertDataService.getAllExperts()
      .then((response) => {
        const experts = response.data;
        this.setState({ experts, filteredExperts: experts });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidUpdate(prevProps) {
    if (this.props.experts !== prevProps.experts) {
      this.setState({
        experts: this.props.experts,
        filteredExperts: this.props.experts,
      });
    }
  }

  render() {
    const { filteredExperts, currentPage, expertsPerPage } = this.state;
    const totalPages = Math.ceil(filteredExperts.length / expertsPerPage);
    const startIndex = (currentPage - 1) * expertsPerPage;
    const endIndex = startIndex + expertsPerPage;
    const displayedExperts = filteredExperts.slice(startIndex, endIndex);
  
    return (
      <div>
        ...
        {displayedExperts.length > 0 ? (
          <div>
            <ul className={styles["cards-list"]}>
              {displayedExperts.map((expert) => (
                <li
                  key={expert.id}
                  className={`${styles["card-container"]} ${styles["list-item"]}`}
                >
                  <ExpertCard expert={expert} />
                </li>
              ))}
            </ul>
            <div className={styles.pagination}>
              <div className={styles.paginationButtons}>
                {[...Array(totalPages)].map((_, number) => {
                  return (
                    <button
                      key={number}
                      onClick={() => this.handlePageChange(number + 1)}
                      className={`${styles.pageButton} ${currentPage === number + 1 ? styles.active : ''}`}
                    >
                      {number + 1}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <NotFoundPage
          title="Did not find what you were looking for?"
          text="If you need help from expert with special expertise, let us know. Our network is huge, we can help to connect you to the right people."
        />
        )}
      </div>
    );
  }
  
}
const mapStateToProps = (state) => ({
  experts: state.experts,
});

export default connect(mapStateToProps, { updateExpert, deleteExpert })(
  ExpertList
);
