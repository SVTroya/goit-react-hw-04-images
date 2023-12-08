import PropTypes from 'prop-types';
import { SearchIcon, StyledHeader, StyledSearchForm } from './Searchbar.styled';
import { useState } from 'react';

Searchbar.propTypes = {
  handleSearch: PropTypes.func,
};

export function Searchbar({ handleSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchInputId = crypto.randomUUID();

  function onSubmit(ev){
    ev.preventDefault();
    handleSearch(searchQuery);
  }

  return (
    <StyledHeader>
      <StyledSearchForm
        onSubmit={onSubmit}>
        <label htmlFor={searchInputId}>Search input</label>
        <input
          id={searchInputId}
          value={searchQuery}
          onChange={({ target }) => setSearchQuery(target.value)}
          type='text'
          name='searchQuery'
          autoComplete='off'
          autoFocus
          placeholder='Search images and photos'
        />
        <button type='submit'>
          <SearchIcon />
        </button>
      </StyledSearchForm>
    </StyledHeader>
  );
}
