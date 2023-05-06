import React, { useState } from 'react';

const SearchFilter = ({ innovations, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const filteredInnovations = innovations.filter((innovation) =>
      innovation.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    onFilter(filteredInnovations);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search innovations by name"
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchFilter;
