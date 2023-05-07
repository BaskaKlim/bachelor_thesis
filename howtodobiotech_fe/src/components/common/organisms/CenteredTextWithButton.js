import React from 'react';
import styles from './CenteredTextWithButton.module.css';


const CenteredTextWithButton = ({ text, textButton }) => {
  const handleClick = () => {
    window.location.href = 'https://your-redirection-url.com';
  };

  return (
    <div className={styles.container}>
      <p className={styles.centeredText}>{text}</p>
      <button className={styles.redirectButton} onClick={handleClick}>
        {textButton}
      </button>
    </div>
  );
};

export default CenteredTextWithButton;
