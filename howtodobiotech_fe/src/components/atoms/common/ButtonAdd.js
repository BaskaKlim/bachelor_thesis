import React from "react";
import styles from "./Buttons.module.css";

const ButtonAdd = ({ onClick }) => {
  return (
    <button className={styles.btnUpdate} onClick={onClick}>
      Add
    </button>
  );
};

export default ButtonAdd;