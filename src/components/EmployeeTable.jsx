import React from 'react';

import { EmployeeRow } from './EmployeeRow';
import './EmployeeTable.css';

export const EmployeeTable = ({ sortCriteria, peopleArray, handleHeaderClick }) => {
  const { sortBy, sortDirection } = sortCriteria;
  const nameHeader = sortBy === 'name' ? sortDirection === 'asc' ? <>&uarr; Name</> : <>&darr; Name</> : 'Name';
  const titleHeader = sortBy === 'title' ? sortDirection === 'asc' ? <>&uarr; Title</> : <>&darr; Title</> : 'Title';
  const departmentHeader = sortBy === 'department' ? sortDirection === 'asc' ? <>&uarr; Department</> : <>&darr; Department</> : 'Department';
  const locationHeader = sortBy === 'location' ? sortDirection === 'asc' ? <>&uarr; Location</> : <>&darr; Location</> : 'Location';

  return (
    <table className='directory-table'>
      <thead className='directory-table-header'>
        <tr className='directory-table-header-row'>
          <th className='name-cell sortable' id='name' onClick={handleHeaderClick}>{nameHeader}</th>
          <th className='picture-cell'>Picture</th>
          <th className='title-cell sortable' id='title' onClick={handleHeaderClick}>{titleHeader}</th>
          <th className ='department-cell sortable' id='department' onClick={handleHeaderClick}>{departmentHeader}</th>
          <th className='email-cell'>Email</th>
          <th className='phone-number-cell'>Phone Number</th>
          <th className='location-cell sortable' id='location' onClick={handleHeaderClick}>{locationHeader}</th>
        </tr>
      </thead>
      <tbody>
        {peopleArray.map((person, index) => {
          return (
            <EmployeeRow key={index} person={person} />
          );
        })}
      </tbody>
    </table>
  );
};
