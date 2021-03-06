import React from 'react';

import './EmployeeRow.css';

export const EmployeeRow = ({ person }) => {
  const { name, dob, picture, employeeinfo, email, phone, location } = person;
  const { first, last } = name;
  const formattedName = `${first} ${last}`;
  const { date } = dob;
  const formattedDate = `DOB: ${new Date(date).toLocaleString()}`;
  const { department, title } = employeeinfo;
  const { city, state, country, postcode } = location;
  const formattedLocation = `Location Details: ${city}, ${state}, ${postcode}`;

  return (
    <tr className='employee-row'>
      <td className='name-cell' title={formattedDate}>{formattedName}</td>
      <td className='picture-cell'>
        <img src={picture.thumbnail} alt={formattedName} />
      </td>
      <td className='title-cell'>{title}</td>
      <td className ='department-cell'>{department}</td>
      <td className='email-cell'>{email}</td>
      <td className='phone-number-cell'>{phone}</td>
      <td className='location-cell' title={formattedLocation}>{country}</td>
    </tr>
  );
};