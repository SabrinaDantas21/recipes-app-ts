import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import { getDrinksByFilter, getMealByFilter } from '../services/api';
import { SelectedPage } from '../util/types';

const searchBarFilterState = {
  searchBarValue: '',
  radioBtnValue: '',
};

function SearchBar({ page }: SelectedPage) {
  const [searchBarInfo, setSearchBarInfo] = useState(searchBarFilterState);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchBarInfo((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const currentInfo = {
      searchBarInfo,
      navigate,
    };

    if (page === 'meals') {
      await getMealByFilter(currentInfo);
    }

    if (page === 'drinks') {
      await getDrinksByFilter(currentInfo);
    }
  };

  return (
    <div>
      <Input
        type="text"
        name="searchBarValue"
        data-testid="search-input"
        onChange={ handleChange }
        value={ searchBarInfo.searchBarValue }
      />
      <div>
        <Input
          data-testid="ingredient-search-radio"
          id="ingredient-radio"
          type="radio"
          name="radioBtnValue"
          onChange={ handleChange }
          value="ingredient-radio"
        />
        <label htmlFor="ingredient-radio">Ingredient</label>
      </div>
      <div>
        <Input
          data-testid="name-search-radio"
          id="name-radio"
          type="radio"
          name="radioBtnValue"
          onChange={ handleChange }
          value="name-radio"
        />
        <label htmlFor="name-radio">Name</label>
      </div>
      <div>
        <Input
          data-testid="first-letter-search-radio"
          id="first-letter-radio"
          type="radio"
          name="radioBtnValue"
          onChange={ handleChange }
          value="first-letter-radio"
        />
        <label htmlFor="first-letter-radio">First letter</label>
      </div>
      <Button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleSubmit }
      >
        Search
      </Button>
    </div>
  );
}

export default SearchBar;
