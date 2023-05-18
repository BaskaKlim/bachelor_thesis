import React from "react";
import Select from "react-select";
import styles from "./Select.module.css";

const countryOptions = [
  { id: 1, name: "ALBANIA" },
  { id: 2, name: "CROATIA" },
  { id: 3, name: "CZECHIA" },
  { id: 4, name: "ESTONIA" },
  { id: 5, name: "HUNGARY" },
  { id: 6, name: "LATVIA" },
  { id: 7, name: "LITHUANIA" },
  { id: 8, name: "POLAND" },
  { id: 9, name: "SLOVAKIA" },
  { id: 10, name: "SLOVENIA" },
  { id: 11, name: "UKRAINE" },
  { id: 12, name: "CEE" },
];
const CountriesSelect = (props) => {
  const { value, onChange } = props;

  const handleCountriesChange = (selectedOptions) => {
    onChange(selectedOptions);
  };

  return (
    <div className={styles.select}>
      <Select
        options={countryOptions.map((country) => ({
          value: country,
          label: country.name,
          key: `country-${country.id}`,
        }))}
        isMulti
        onChange={handleCountriesChange}
        value={value}
      />
    </div>
  );
};
export default CountriesSelect;
