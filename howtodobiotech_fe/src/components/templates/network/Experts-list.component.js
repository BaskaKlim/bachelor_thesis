import React, { Component } from "react";
import { connect } from "react-redux";
import { updateExpert, deleteExpert } from "../../../actions/experts";
import ExpertDataService from "../../../service/Expert.service";
import ExpertCard from "../../organisms/network/Expert.card";
import styles from "./ExpertList.module.css";
import NotFoundPage from "../../organisms/common/NotFoundPage.component";

const expertiseOptions = [
  { id: 1, name: "BUSINESS_DEVELOPMENT", title: "BUSINESS DEVELOPMENT",  color: "#E35149" },
  { id: 2, name: "LIFE_SCIENCE",title: "LIFE SCIENCE", color: "#110777" },
  { id: 3, name: "CHEMISTRY", title: "CHEMISTRY",color: "#7369ff" },
  { id: 4, name: "BIOLOGY", title: "BIOLOGY",color: "#FF928F" },
  { id: 5, name: "BIOINFORMATICS",title: "BIOINFORMATICS", color: "#91B3FA" },
  { id: 6, name: "DATA_SCIENCE", title: "DATA SCIENCE",color: "#A22B25" },
  { id: 7, name: "LEGAL",title: "LEGAL", color: "#4B4D4B4DF7F7" },
  { id: 8, name: "MVP_PRTOTOTYPING", title: "MVP PRTOTOTYPING",color: "#A22B25" },
  { id: 9, name: "BUSINESS_VALIDATION",title: "BUSINESS VALIDATION", color: "#7369ff" },
  { id: 10, name: "PRODUCT_DESING",title: "PRODUCT DESING", color: "#FF928F" },
  { id: 11, name: "CLINICAL_TRIAL", title: "CLINICAL TRIAL",color: "#110777" },
  { id: 12, name: "FINANCE",title: "FINANCE", color: "#E35149" },
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
    this.setState({ filteredExperts, currentPage: 1 });
  };

  showAllExperts = () => {
    this.setState({ filteredExperts: this.state.experts, currentPage: 1 });
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
        <div className={styles.filterOptions}>
          <button className={styles['all-categories-button']} onClick={this.showAllExperts}> All Experts</button>
          {expertiseOptions.map((expertise) => (
            <button
              key={expertise.id}
              onClick={() => this.filterByExpertise(expertise.name)}
              style={{ backgroundColor: expertise.color }}
              className={`${styles['category-button']} ${styles.active}`}
            >
              {expertise.title}
            </button>
          ))}
        </div>
  
        {displayedExperts.length > 0 ? (
          <div>
            <ul className={styles['cards-list']}>
              {displayedExperts.map((expert) => (
                <li
                  key={expert.id}
                  className={`${styles['card-container']} ${styles['list-item']}`}
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
                      className={`${styles.pageButton} ${
                        currentPage === number + 1 ? styles.active : ''
                      }`}
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
            text="If you need help from an expert with special expertise, let us know. Our network is huge, and we can help to connect you to the right people."
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
