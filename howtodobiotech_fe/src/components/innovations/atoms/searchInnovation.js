import React, { useState } from 'react';


const SearchInnovation = (props) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onSearch(searchTerm);
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

export default SearchInnovation;
