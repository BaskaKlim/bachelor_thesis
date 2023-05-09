import React, { Component } from 'react';
import InnovationsList from '../templates/innovations -list.component';
import ExpertList from "../templates/ExpertList"; // Import the ExpertList component
import ExpertDataService from '../../../service/ExpertDataService'; // Import ExpertDataService
import InnovationDataService from '../../../service/innovation.service'; 
import CarouselBanner from '../molecules/Carousel.banner'
import CenteredTextWithButton from "../../common/organisms/CenteredTextWithButton";

import styles from './network.page';


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
        <div className={styles["intro"]}>
          <p>
            Welcome to How To Do Biotech, your one-stop platform for finding
            skill development opportunities in the biotech industry. Our
            platform is designed to make it easy for you to find the courses,
            workshops, and events that best suit your needs to improve your skills. Whether you're a
            student, a professional, or an PhD researcher looking to enhance your
            biotech skills, you can find the right opportunity here.
          </p>
        </div>
        <div></div>
        <ExpertList filteredExperts={filteredExperts} /> 
        <CenteredTextWithButton
          text="
          Are you an organizer of biotech skill development courses, workshops, or events?  Are you looking for interns and researchers? We invite you to sign up to our platform and create an account for your organization. Add your workshops, internships, or hackathons to our database and attract young talents in science through our platform. Join us today and be a part of the biotech skill development revolution!"
          textButton="create profile"
        />
        <InnovationsList filteredInnovations={filteredInnovations} />
        
      </div>
    );
  }
}

export default NetworkPage;
