import axios from 'axios';
import React from 'react';

import { EmployeeTable } from './EmployeeTable';
import { Header } from './Header';
import { Pagination } from './Pagination';
import { Search } from './Search';
import './Directory.css';

export const Directory = () => {
  const [peopleArray, setPeopleArray] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [sortCriteria, setSortCriteria] = React.useState({ sortBy: 'name', sortDirection: 'asc' });
  const [page, setPage] = React.useState(1);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleResponse = React.useCallback((response) => {
    const { data } = response;
    const { info, results } = data;
    const sortedResults = sortResults(results, sortCriteria);
    setPeopleArray(sortedResults);
    setPage(info.page);
    setLoading(false);
  }, [sortCriteria]);

  const fetchEmployees = React.useCallback(() => {
    axios.get(`/users/${page}`)
    .then((response) => {
      handleResponse(response);
    })
    .catch((err) => console.log('Error:', err));
  }, [handleResponse, page]);

  const resetSearch = React.useCallback(() => {
    setLoading(true);
    setPage(1);
    fetchEmployees();
    setSearchTerm('');
  }, [fetchEmployees, setSearchTerm]);

  React.useEffect(() => {
    fetchEmployees();
  }, [handleResponse, fetchEmployees, resetSearch, sortCriteria, page]);

  React.useEffect(() => {
    if (searchTerm === '' && peopleArray.length < 50) {
      resetSearch();
    }
  }, [handleResponse, fetchEmployees, sortCriteria, page, resetSearch, searchTerm, peopleArray]);

  const handleHeaderClick = (e) => {
    e.preventDefault();
    const sortDirection = sortCriteria.sortBy === e.target.id && sortCriteria.sortDirection === 'asc'  ? 'desc' : 'asc';
    setSortCriteria({ sortBy: e.target.id, sortDirection });
  };

  const handlePaginationClick = (e) => {
    e.preventDefault();
    setLoading(true);
    const newPage = e.target.id === 'decrement-page' ? page - 1 : page + 1;
    axios.get(`/users/${newPage}`)
      .then((response) => {
        handleResponse(response);
      })
      .catch((err) => console.log('Error:', err));
  };

  const handleSearchChange = (e) =>  {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    const formattedTerm = searchTerm ? searchTerm.trim().toLowerCase() : undefined;
    if (formattedTerm === undefined) {
      return;
    }
    const matchingEmployees = peopleArray.filter((person) => {
      const { name, email, employeeinfo, phone, location } = person;
      return name.first.toLowerCase().indexOf(formattedTerm) > -1 ||
        name.last.toLowerCase().indexOf(formattedTerm) > -1 ||
        email.toLowerCase().indexOf(formattedTerm) > -1 ||
        employeeinfo.department.toLowerCase().indexOf(formattedTerm) >-1 ||
        employeeinfo.title.toLowerCase().indexOf(formattedTerm) >-1 ||
        phone.toLowerCase().indexOf(formattedTerm) >-1 ||
        location.city.toLowerCase().indexOf(formattedTerm) > -1 ||
        location.state.toLowerCase().indexOf(formattedTerm) > -1 ||
        location.country.toLowerCase().indexOf(formattedTerm) > -1;
    });
    setPeopleArray(matchingEmployees);
  };

  return (
    <div className='directory-wrapper'>
      <Header resetSearch={resetSearch} />
      {loading ?
        <div className='loading-spinner' /> : 
        <div className='directory-table-wrapper'>
          <Search searchTerm={searchTerm} handleSearchChange={handleSearchChange} handleSearch={handleSearch} resetSearch={resetSearch} />
          <EmployeeTable sortCriteria={sortCriteria} peopleArray={peopleArray} handleHeaderClick={handleHeaderClick} />
          <Pagination page={page} handlePaginationClick={handlePaginationClick} />
        </div>}
    </div>
  );
};

const sortResults = (peopleArray, sortCriteria) => {
  const { sortBy, sortDirection } = sortCriteria;
  if (sortDirection === 'asc') {
    if (sortBy === 'name') {
      return peopleArray.sort((a, b) => a.name.last.localeCompare(b.name.last));
    } else if (sortBy === 'title') {
      return peopleArray.sort((a, b) => a.employeeinfo.title.localeCompare(b.employeeinfo.title));
    } else if (sortBy === 'department') {
      return peopleArray.sort((a, b) => a.employeeinfo.department.localeCompare(b.employeeinfo.department));
    } else if (sortBy === 'location') {
      return peopleArray.sort((a, b) => a.location.country.localeCompare(b.location.country));
    }
  } else {
    if (sortBy === 'name') {
      return peopleArray.sort((a, b) => b.name.last.localeCompare(a.name.last));
    } else if (sortBy === 'title') {
      return peopleArray.sort((a, b) => b.employeeinfo.title.localeCompare(a.employeeinfo.title));
    } else if (sortBy === 'department') {
      return peopleArray.sort((a, b) => b.employeeinfo.department.localeCompare(a.employeeinfo.department));
    } else if (sortBy === 'location') {
      return peopleArray.sort((a, b) => b.location.country.localeCompare(a.location.country));
    }
  }
};
