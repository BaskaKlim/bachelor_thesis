import React from "react";
import styles from "./Options.module.css";

const countries = [
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

const CountryOptions = ({ selectedCountry, handleCountryFilter }) => {
  const rows = Math.ceil(countries.length / 7);  

  return (
    <div className={styles["filter-group"]}>
      <div className={styles["filter-group-title"]}> Choose preferred country in CEE:
     
        {[...Array(rows)].map((_, rowIndex) => (
          <div className={styles["row"]} key={rowIndex}>
            {countries
              .slice(rowIndex * 7, (rowIndex + 1) * 7) // Get the 7 items for the current row
              .map((country) => (
                <button
                  key={country.id}
                  onClick={() => handleCountryFilter(country.id)}
                  style={{
                    backgroundColor: country.id === selectedCountry ? "#4B4DF7" : "#EFEFEF",
                    color: country.id === selectedCountry ? "black" : "gray",
                  }}
                  className={styles["categoryButton"]}
                >
                  {country.name}
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  
  );
};

export default CountryOptions;
