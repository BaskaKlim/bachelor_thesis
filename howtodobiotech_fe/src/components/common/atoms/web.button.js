import React from 'react';
import styles from './Web.button.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';

const WebsiteButton = ({ url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.WebsiteButton}>
      <FontAwesomeIcon icon={faSquareArrowUpRight} className={styles.WebsiteIcon} />
      <span className={styles.WebsiteText}>Website</span>
    </a>
  );
};

export default WebsiteButton;
