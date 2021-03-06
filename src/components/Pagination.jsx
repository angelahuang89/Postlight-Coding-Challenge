import React from 'react';

import './Pagination.css';

export const Pagination = ({ page, handlePaginationClick }) => {
  return (
    <div className='pagination-wrapper'>
      <button className='pagination-control' id='decrement-page' disabled={page === 1} onClick={handlePaginationClick}>{'<'}</button>
      <div className='pagination-page'>{page}</div>
      <button className='pagination-control' id='increment-page' disabled={page === 100} onClick={handlePaginationClick}>{'>'}</button>
    </div>
  );
};
