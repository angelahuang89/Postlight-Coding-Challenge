import React from 'react';

import './Header.css';

export const Header = ({ resetSearch }) => {
  return (
    <h1 className='header' title='Click header to reset search' onClick={resetSearch}>
      Employee Directory
    </h1>
  );
};
