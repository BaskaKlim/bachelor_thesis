import React from 'react';
import styles from './Footer.module.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoSection}>
        <img className={styles.logo} src="/assets/logo_blue.png" alt="How To Do Biotech" />
        <p className={styles.shortText}>Find the right resources, mentorship, and support they need.</p>
      </div>
      <div className={styles.contactSection}>
        <h4>Contact Us</h4>
        <p>Email: contact@example.com</p>
        <p>Phone: +1 (555) 123-4567</p>
        <p>Address: 1234 Startup Avenue, City, Country</p>
      </div>
      <div className={styles.socialMediaSection}>
        <h4>Follow Us</h4>
        <div className={styles.socialMediaIcons}>
          <a href="https://www.facebook.com/yourorganization" target="_blank" rel="noopener noreferrer" className={styles.socialMediaIcon}><FaFacebook /></a>
          <a href="https://twitter.com/yourorganization" target="_blank" rel="noopener noreferrer" className={styles.socialMediaIcon}><FaTwitter /></a>
          <a href="https://www.linkedin.com/company/yourorganization" target="_blank" rel="noopener noreferrer" className={styles.socialMediaIcon}><FaLinkedin /></a>
          <a href="https://www.instagram.com/yourorganization" target="_blank" rel="noopener noreferrer" className={styles.socialMediaIcon}><FaInstagram /></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
