import React, { Component } from "react";
import { connect } from "react-redux";
import { updateExpert, deleteExpert } from "../../../actions/experts";
import ExpertDataService from "../../../service/ExpertDataService";
import ExpertCard from "../atoms/ExpertCard";
import styles from "./ExpertList.module.css";

const expertiseOptions = [
  {id:1, name: "BUSINESS_DEVELOPMENT", color: '#E35149'},
  {id:2, name: "LIFE_SCIENCE", color: '#A22B25'},
  {id:3, name: "CHEMISTRY", color: '#110777'},
  {id:4, name: "BIOLOGY", color: '#E35149'},
  {id:5, name: "BIOINFORMATICS", color: '#7369ff'},
  {id:6, name: "DATA_SCIENCE", color: '#E35149'},
  {id:7, name: "LEGAL", color: '#4B4DF7'},
  {id:8, name: "MVP_PRTOTOTYPING", color: '#E35149'},
  {id:9, name: "BUSINESS_VALIDATION", color: '#E35149'},
  {id:10, name: "PRODUCT_DESING", color: '#E35149'},
  {id:11, name: "CLINICAL_TRIAL", color: '#FF928F'},
  {id:12, name: "FINANCE", color: '#91B3FA'}
];class ExpertList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      experts: [],
      filteredExperts: [],
      currentPage: 1
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
    if (this.props.filteredExperts !== prevProps.filteredExperts) {
      this.setState({ filteredExperts: this.props.filteredExperts });
    }
  }
  render() {
    const { filteredExperts, currentPage } = this.state;
    const expertsPerPage = 6;
    const totalPages = Math.ceil(filteredExperts.length / expertsPerPage);
    const startIndex = (currentPage - 1) * expertsPerPage;
    const endIndex = startIndex + expertsPerPage;
    const displayedExperts = filteredExperts.slice(startIndex, endIndex);
  
    return (
      <div>
        <h4>List of Experts</h4>
  
        <div>
          <button
            className={styles["all-expertises-button"]}
            onClick={this.showAllExperts}
          >
            All Expertises
          </button>
          {expertiseOptions.map((expertise) => (
            <button
              key={expertise.id}
              onClick={() => this.filterByExpertise(expertise.name)}
              className={styles["expertise-button"]}
              style={{ backgroundColor: expertise.color }}
            >
              {expertise.name.toLowerCase().replace(/^\w/, (c) =>
                c.toUpperCase()
              )}
            </button>
          ))}
        </div>
  
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
            <nav>
              <ul className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <li key={index} className="page-item">
                    <button
                      className={`page-link ${
                        index + 1 === currentPage ? "active" : ""
                      }`}
                      onClick={() => this.handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  experts: state.experts,
});

export default connect(mapStateToProps, { updateExpert, deleteExpert })(ExpertList);
