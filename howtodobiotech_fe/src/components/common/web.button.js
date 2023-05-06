import React from 'react';
import styles from './web.button.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';


const WebsiteButton = ({ url }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={styles.WebsiteButton}>
      <FontAwesomeIcon icon={faSquareArrowUpRight} />
    </a>
  );
};

export default WebsiteButton;