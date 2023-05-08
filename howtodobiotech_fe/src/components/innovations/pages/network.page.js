import React, { Component } from 'react';
import InnovationsList from '../templates/innovations -list.component';
import ExpertList from "../../experts/templates/ExpertList"; // Import the ExpertList component
import ExpertDataService from '../../../service/ExpertDataService'; // Import ExpertDataService
import InnovationDataService from '../../../service/innovation.service'; 
import CarouselBanner from '../molecules/Carousel.banner'


class NetworkPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      innovations: [],
      filteredInnovations: [],
      experts: [],
      filteredExperts: [],
    };
  }

  async componentDidMount() {
    try {
      const innovationResponse = await InnovationDataService.getAllInnovations();
      const innovations = innovationResponse.data;
      this.setState({ innovations, filteredInnovations: innovations });

      const expertResponse = await ExpertDataService.getAllExperts();
      const experts = expertResponse.data;
      this.setState({ experts, filteredExperts: experts });
    } catch (error) {
      console.error(error);
    }
  }
  handleInnovationFilter = async (searchTerm) => {
    const response = await InnovationDataService.getInnovationByTitle(searchTerm);
    const innovationWithTitle = response.data;

    this.setState({ filteredInnovations: innovationWithTitle ? [innovationWithTitle] : [] });
  };

  handleExpertFilter = async (expertise) => {
    const response = await ExpertDataService.getExpertsByExpertise(expertise);
    const expertsWithExpertise = response.data;

    this.setState({ filteredExperts: expertsWithExpertise });
  };

  render() {
    const { filteredInnovations, filteredExperts } = this.state;

    return (
      <div>
        <CarouselBanner />
      
        <ExpertList filteredExperts={filteredExperts} /> 
        <InnovationsList filteredInnovations={filteredInnovations} />
      </div>
    );
  }
}

export default NetworkPage;
