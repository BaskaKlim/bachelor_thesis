import React, { Component } from "react";
import InnovationsList from "../templates/network/Innovations-list.component";
import ExpertList from "../templates/network/Experts-list.component";
import ExpertDataService from "../../service/ExpertDataService";
import InnovationDataService from "../../service/innovation.service";
import CarouselBanner from "../organisms/network/InnovationCarousel.banner";
import CenteredTextWithButton from "../organisms/common/CenteredText.component";

import styles from "./NetworkPage.module.css";

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
      const innovationResponse =
        await InnovationDataService.getAllInnovations();
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
    const response = await InnovationDataService.getInnovationByTitle(
      searchTerm
    );
    const innovationWithTitle = response.data;

    this.setState({
      filteredInnovations: innovationWithTitle ? [innovationWithTitle] : [],
    });
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
            This section is dedicated to showcasing exceptional biotechnological
            innovations from the Central and Eastern Europe region. Explore
            groundbreaking advancements and discover profiles of renowned
            experts who serve as mentors in their respective fields. These
            experts' profiles are based on their public LinkedIn profiles and
            participation in European accelerators and innovation programs.
            Connect with these experts in person through various accelerator
            programs and experience the vibrant innovation ecosystem firsthand.
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
