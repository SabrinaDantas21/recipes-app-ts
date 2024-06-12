import React from 'react';
import { Button } from 'react-bootstrap';
import Input from './Input';

function SearchBar() {
  return (
    <div>
      <Input
        type="text"
        data-testid="search-input"
      />
      <div>
        <Input
          data-testid="ingredient-search-radio"
          type="radio"
          name="filter-radio"
          value="ingredient-radio"
        />
        <label htmlFor="ingredient-radio">Ingredient</label>
      </div>
      <div>
        <Input
          data-testid="name-search-radio"
          type="radio"
          name="filter-radio"
          value="name-radio"
        />
        <label htmlFor="name-radio">Name</label>
      </div>
      <div>
        <Input
          data-testid="first-letter-search-radio"
          type="radio"
          name="filter-radio"
          value="first-letter-radio"
        />
        <label htmlFor="first-letter-radio">First letter</label>
      </div>
      <Button data-testid="exec-search-btn">Search</Button>
    </div>
  );
}

export default SearchBar;
