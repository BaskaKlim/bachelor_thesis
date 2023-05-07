import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStartupOpt, deleteStartupOpt } from '../../../actions/startups';
import StartupOptDataService from '../../../service/Startup.service';
import Card from '../atoms/card';
import styles from './startupOptsList.module.css';

const supportOptions = [
    { id: 1, name: 'INCUBATOR', imageUrl: '/assets/incubator.png', color: '#38acc9' },
    { id: 2, name: 'ACCELERATOR', imageUrl: '/assets/accelerator.png', color: '#e85146' },
    { id: 3, name: 'INVESTMENT', imageUrl: '/assets/investment.png', color: '#4c59e6' },
    { id: 4, name: 'MENTORING', imageUrl: '/assets/mentoring.png', color: '#e31e1e' },
    { id: 5, name: 'AWARDS', imageUrl: '/assets/awards.png', color: '#822bed' },
  ];

  const categoryOptions = [
    { id: 1, name: 'MEDICINE', imageUrl: '/assets/medicine.jpg', color: '#fa6c61' },
    { id: 2, name: 'BIOINFORMATICS', imageUrl: '/assets/bioinformatics.jpg', color: '#221196' },
    { id: 3, name: 'ENERGY', imageUrl: '/assets/energy.jpg', color: '#857cd9' },
    { id: 4, name: 'FOOD', imageUrl: '/assets/food.jpg', color: '#1826de' },
    { id: 5, name: 'ENVIRONMENTAL', imageUrl: '/assets/environmental.jpg', color: '#749cdb' },
    { id: 6, name: 'AGRICULTURE', imageUrl: '/assets/agriculture.jpg', color: '#f73a2d' },
    { id: 7, name: 'MARINE', imageUrl: '/assets/marine.jpg', color: '#3374ff' },
  ];

  class StartupOptList extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        startupOpts: [],
        filteredStartupOpts: [],
        selectedCategory: null,
        selectedSupportOption: null,
      };
    }

    filterStartupOpts = () => {
      const { selectedCategory, selectedSupportOption, startupOpts } = this.state;
  
      const filteredStartupOpts = startupOpts.filter((startupOpt) => {
        const hasSelectedCategory = selectedCategory === null || startupOpt.categories.some((category) => category.id === selectedCategory);
        const hasSelectedSupportOption = selectedSupportOption === null || startupOpt.supportCategories.some((supportCategory) => supportCategory.id === selectedSupportOption);
  
        return hasSelectedCategory && hasSelectedSupportOption;
      });
  
      this.setState({ filteredStartupOpts });
    };
  
    handleCategoryFilter = (categoryId) => {
      this.setState({ selectedCategory: categoryId }, this.filterStartupOpts);
    };
  
    handleSupportOptionFilter = (supportOptionId) => {
      this.setState({ selectedSupportOption: supportOptionId }, this.filterStartupOpts);
    };
  
    showAllStartupOpts = () => {
      this.setState({ selectedCategory: null, selectedSupportOption: null }, this.filterStartupOpts);
    };
  
    componentDidMount() {
      StartupOptDataService.getAllStartupOpts()
        .then((response) => {
          const startupOpts = response.data;
          this.setState({ startupOpts, filteredStartupOpts: startupOpts });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  
    componentDidUpdate(prevProps) {
      if (this.props.filteredStartupOpts !== prevProps.filteredStartupOpts) {
        this.setState({ filteredStartupOpts: this.props.filteredStartupOpts });
      }
    }
  
    render() {
      const { filteredStartupOpts } = this.state;
    
      return (
        <div>
          <h4>List of Startup Opportunities</h4>
    
          <div>
            <button
              className={styles['all-categories-button']}
              onClick={this.showAllStartupOpts}
            >
              All support opportunities
            </button>
            {categoryOptions.map((category) => (
              <button
                key={category.id}
                onClick={() => this.handleCategoryFilter(category.id)}
                style={{ backgroundColor: category.color }}
                className={styles['category-button']}
              >
                {category.name}
              </button>
            ))}
            {supportOptions.map((supportOption) => (
              <button
                key={supportOption.id}
                onClick={() => this.handleSupportOptionFilter(supportOption.id)}
                style={{ backgroundColor: supportOption.color }}
                className={styles['support-option-button']}
              >
                {supportOption.name}
              </button>
            ))}
          </div>
    
          {filteredStartupOpts.length > 0 ? (
            <ul className={styles['cards-list']}>
              {filteredStartupOpts.map((startupOpt) => {
                const firstSupportCategory = startupOpt.supportCategories && startupOpt.supportCategories[0];
                const supportCategory = firstSupportCategory && supportOptions.find(
                  (supportOption) => supportOption.id === firstSupportCategory.id
                );
    
                return (
                  <li
                    key={startupOpt.id}
                    className={`${styles['card-container']} ${styles['list-item']}`}
                  >
                    {supportCategory && (
                      <img
                        src={supportCategory.imageUrl}
                        alt={supportCategory.name}
                        className={styles['support-category-image']}
                      />
                    )}
                    <Card startupOpt={startupOpt} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      );
    }
    

}
  const mapStateToProps = (state) => ({
    startupOpts: state.startupOpts,
  });
  
  export default connect(mapStateToProps, { updateStartupOpt, deleteStartupOpt })(StartupOptList);