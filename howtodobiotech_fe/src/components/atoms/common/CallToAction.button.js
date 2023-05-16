import React from "react";
import { Link } from "react-router-dom";
import styles from "./CallToActionButton.module.css";

const Button = ({ url, textButton }) => {
  return (
    <Link to={url} className={styles.btn}>
      {textButton} 
    </Link>
  );
};

export default Button;
