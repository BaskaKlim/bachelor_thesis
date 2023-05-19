import React, { Component } from "react";
import SkillOptList from "../templates/skills/SkillOptList.component";
import CenteredTextWithButton from "../organisms/common/CallToActionComponnetAccordingRole";
import CarouselBanner from "../organisms/skills/SkillCarousel.banner";
import styles from "./SkillPage.module.css";

class SkillOptPage extends Component {
  render() {
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

        <SkillOptList />
        <CenteredTextWithButton
        textPublic="Are you an organizer of biotech skill development courses, workshops, or events?  Are you looking for interns and researchers? We invite you to sign up to our platform and create an account for your organization. Add your workshops, internships, or hackathons to our database and attract young talents in science through our platform. Join us today and be a part of the biotech skill development revolution!"
        urlPublic="/register"
        buttonTextPublic="create account"
        textLoggedIn="Great! You are logged in your organization account. Now you can create new skills opprortunities for young talents from business & science indusrty."
        urlLoggedIn="/skill-opportunities/add"
        buttonTextLoggedIn="add opportunity"
        />
      </div>
    );
  }
}

export default SkillOptPage;
