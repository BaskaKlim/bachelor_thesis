import React from "react";
import styles from "./Buttons.module.css";

const ButtonDelete = ({ onClick }) => {
  return (
    <button className={styles.btnDelete} onClick={onClick}>
      Delete
    </button>
  );
};

export default ButtonDelete;