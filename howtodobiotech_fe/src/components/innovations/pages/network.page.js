import React, { Component } from 'react';
import InnovationsList from '../templates/innovations -list.component';
import InnovationDataService from '../../../service/innovation.service'; 
import CarouselBanner from '../molecules/Carousel.banner'


class NetworkPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      innovations: [],
      filteredInnovations: [],
    };
  }

  async componentDidMount() {
    try {
      const response = await InnovationDataService.getAllInnovations();
      const innovations = response.data;
      this.setState({ innovations, filteredInnovations: innovations });
    } catch (error) {
      console.error(error);
    }
  }

  handleFilter = async (searchTerm) => {
    const response = await InnovationDataService.getInnovationByTitle(searchTerm);
    const innovationWithTitle = response.data;

    this.setState({ filteredInnovations: innovationWithTitle ? [innovationWithTitle] : [] });
  };

  render() {
    const { filteredInnovations } = this.state;

    return (
      <div>
        <CarouselBanner/>
        <InnovationsList filteredInnovations={filteredInnovations} />
      </div>
    );
  }
}

export default NetworkPage;