import React from "react";
import styles from "./Buttons.module.css";

const ButtonBack = ({ onClick }) => {
  return (
    <button className={styles.btnBack} onClick={onClick}>
      Back
    </button>
  );
};

export default  ButtonBack;