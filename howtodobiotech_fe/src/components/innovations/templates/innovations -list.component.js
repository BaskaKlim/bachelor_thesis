import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateInnovation, deleteInnovation } from '../../../actions/innovations';
import InnovationDataService from '../../../service/innovation.service';
import Card from '../atoms/card';
import styles from './InnovationsList.module.css'; // Import the new CSS module



const categoryOptions = [
  { id: 1, name: 'MEDICINE', imageUrl: '/assets/medicine.jpg' },
  { id: 2, name: 'BIOINFORMATICS', imageUrl: '/assets/bioinformatics.jpg' },
  { id: 3, name: 'ENERGY', imageUrl: '/assets/energy.jpg' },
  { id: 4, name: 'FOOD', imageUrl: '/assets/food.jpg' },
  { id: 5, name: 'ENVIRONMENTAL', imageUrl: '/assets/environmental.jpg' },
  { id: 6, name: 'AGRICULTURE', imageUrl: '/assets/agriculture.jpg' },
  { id: 7, name: 'MARINE', imageUrl: '/assets/marine.jpg' },
];


class InnovationsList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      innovations: [],
      filteredInnovations:[],
    };
    this.handleFilter = this.handleFilter.bind(this);
  }
  componentDidMount() {
    InnovationDataService.getAllInnovations()
      .then((response) => {
        this.setState({ innovations: response.data, filteredInnovations: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  
    // Fetch the list of categories and countries here
    // and update the state accordingly
    // Assuming you have methods to fetch categories and countries from your API
    InnovationDataService.getAllCategories()
      .then((response) => {
        this.setState({ categories: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  
    InnovationDataService.getAllCountries()
      .then((response) => {
        this.setState({ countries: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  handleFilter(filteredInnovations) {
    this.setState({ filteredInnovations });
  }

  render() {
    const { filteredInnovations } = this.state;
  
    return (
      <div>
        <h4>List of Innovations</h4>
       
        {filteredInnovations.length > 0 ? (
          <ul className={styles['cards-list']}>
            {filteredInnovations.map((innovation) => {
              const firstCategory = innovation.categories[0];
              const category = categoryOptions.find((cat) => cat.id === firstCategory.id);
  
              return (
                <li key={innovation.id} className={`${styles['card-container']} ${styles['list-item']}`}>
                  {category && (
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className={styles['category-image']}
                    />
                  )}
                  <Card innovation={innovation} />
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
    innovations: state.innovations,
    });
    
    export default connect(mapStateToProps, { updateInnovation, deleteInnovation })(
    InnovationsList
    );
