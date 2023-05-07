import React, { Component } from "react";
import StartupOptList from "../templates/startupOpts-list.component";
import CenteredTextWithButton from "../../common/organisms/CenteredTextWithButton";
import CarouselBanner from "../../startups/organisms/Carousel.banner";
import styles from "./StartupPage.module.css";

class StartupOptPage extends Component {
  render() {
    return (
      <div>
        <CarouselBanner />

        <div className={styles["intro"]}>
          <p>
            Welcome to How To Do Biotech, your one-stop platform for finding
            support for your biotech startup at any stage of development. Our
            platform is designed to make it easy for you to find the support you
            need. Simply browse our listings to discover the opportunities that
            best suit your needs. Whether you're just starting out or looking to
            take your biotech startup to the next level.
          </p>
        </div>
        <div></div>

        <StartupOptList />
        <CenteredTextWithButton
          text="Your centered text goes here."
          textButton="Click to redirect"
        />
      </div>
    );
  }
}

export default StartupOptPage;
