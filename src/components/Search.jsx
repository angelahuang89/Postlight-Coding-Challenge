import React from 'react';

import './Search.css';

export const Search = ({ searchTerm, handleSearchChange, handleSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className='search-employees'>
      <input
        type='text'
        className='search-input'
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
        placeholder='Search employees'
      />
      <button className='search-button' onClick={handleSearch}>Search</button>
    </div>
  );
};
