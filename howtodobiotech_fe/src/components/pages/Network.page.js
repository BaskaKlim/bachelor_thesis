import React, { Component } from "react";
import InnovationsList from "../templates/network/Innovations-list.component";
import ExpertList from "../templates/network/Experts-list.component";
import ExpertDataService from "../../service/ExpertDataService";
import InnovationDataService from "../../service/innovation.service";
import CarouselBanner from "../organisms/network/InnovationCarousel.banner";
import Newsletter from "../organisms/common/Newsletter.banner";
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
     
        <ExpertList filteredExperts={filteredExperts} />

        <div>
          <Newsletter
            text="Stay informed, inspired, and connected with How To Do Biotech. Together, let's unlock the endless possibilities of the biotech world."
            backgroundColor="#edebeb"
          />
        </div>

        <div className={styles["intro"]}>
          <p>
            Discover the extraordinary world of biotech innovation in the CEE
            region through our comprehensive database. Our platform empowers you
            to navigate and explore the diverse landscape of biotech innovation,
            ensuring you stay at the forefront of scientific breakthroughs in
            the European region. With filtering you can effortlessly explore a
            wide range of categories. Uncover the latest advancements in
            medicine, where breakthrough vaccines and regenerative therapies are
            revolutionizing healthcare. Dive into the realm of bioinformatics,
            unraveling the secrets of DNA and amino acid sequences. Explore the
            realms of food, environment, agriculture, marine, and energy
            biotechnology, each offering transformative solutions.
          </p>
        </div>

        <InnovationsList filteredInnovations={filteredInnovations} />
      </div>
    );
  }
}

export default NetworkPage;
