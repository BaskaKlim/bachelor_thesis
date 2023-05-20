import React, { Component } from "react";
import StartupOptList from "../templates/startups/StartupOptList";
import CenteredTextWithButton from "../organisms/common/CallToActionComponnetAccordingRole";
import CarouselBanner from "../organisms/startups/StartupCarousel.banner";
import styles from "./Page.module.css";

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


        <StartupOptList />
        <CenteredTextWithButton
         textPublic="Are you an investor, VC funding manager, or do you lead business & mentoring programs for biotech startups and young scientists? If so, we invite you to sign up to our platform and add your support opportunities into our database. By doing so, you'll gain access to a wide network of biotech innovators and entrepreneurs, and help shape the future of the industry. Join us today and be a part of the biotech revolution!."
         urlPublic="/register"
         buttonTextPublic="create account"
         textLoggedIn="Add your incubator, VC fond or mentoring program into the database now and spread it to the world of biotechnology startups."
         urlLoggedIn="/startup-opportunities/add"
         buttonTextLoggedIn="add support"
        />
      </div>
    );
  }
}

export default StartupOptPage;
