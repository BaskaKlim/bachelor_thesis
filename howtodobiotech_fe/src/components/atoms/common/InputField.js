import React from "react";
import PropTypes from "prop-types";
import styles from "./InputField.module.css";

const InputField = ({ label, size, id, type, name, value, onChange }) => {
    return (
      <div className={styles.inputWrapper}>
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          className={styles.input}
          size={size}
          id={id}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
      </div>
    );
  };

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  size: PropTypes.string,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default InputField;
