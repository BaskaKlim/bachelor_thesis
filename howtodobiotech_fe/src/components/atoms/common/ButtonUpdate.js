import React from "react";
import styles from "./Buttons.module.css";

const ButtonUpdate = ({ onClick }) => {
  return (
    <button className={styles.btnUpdate} onClick={onClick}>
      Update
    </button>
  );
};

export default ButtonUpdate;