import React from 'react';
import SearchInnovation from '../atoms/searchInnovation';


const SearchComponent = () => {
    const handleSearch = (searchTerm) => {
        // Perform the search logic here and update the state with the search results
        console.log('Searching for:', searchTerm);
    };

    return (
        <div>
            <SearchInnovation onSearch={handleSearch} />
            {/* Render the search results here */}
        </div>
    );
};

export default SearchComponent;
