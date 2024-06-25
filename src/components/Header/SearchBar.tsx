import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Input from '../Input';
import { getDrinksByFilter, getMealByFilter } from '../../services/api';
import { SelectedPage } from '../../util/types';
import { verifyLength } from '../../util/helpers';
import './Header.css';

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
    };

    if (page === 'meals') {
      const data = await getMealByFilter(currentInfo);
      return verifyLength('meal', data, navigate);
    }

    if (page === 'drinks') {
      const data = await getDrinksByFilter(currentInfo);
      return verifyLength('drink', data, navigate);
    }
  };

  return (
    <div className="search-container">
      <Input
        type="text"
        name="searchBarValue"
        data-testid="search-input"
        className="search-text-input"
        onChange={ handleChange }
        value={ searchBarInfo.searchBarValue }
      />
      <div className="filter-btn-container">
        <div className="radio-btn-group">
          <Input
            data-testid="ingredient-search-radio"
            className="search-radio-btn-input"
            id="ingredient-radio"
            type="radio"
            name="radioBtnValue"
            onChange={ handleChange }
            value="ingredient-radio"
          />
          <label htmlFor="ingredient-radio">Ingredient</label>
        </div>
        <div className="radio-btn-group">
          <Input
            data-testid="name-search-radio"
            className="search-radio-btn-input"
            id="name-radio"
            type="radio"
            name="radioBtnValue"
            onChange={ handleChange }
            value="name-radio"
          />
          <label htmlFor="name-radio">Name</label>
        </div>
        <div className="radio-btn-group">
          <Input
            data-testid="first-letter-search-radio"
            className="search-radio-btn-input"
            id="first-letter-radio"
            type="radio"
            name="radioBtnValue"
            onChange={ handleChange }
            value="first-letter-radio"
          />
          <label htmlFor="first-letter-radio">First letter</label>
        </div>
        <div className="btn-container">
          <Button
            type="button"
            data-testid="exec-search-btn"
            className="btn-search"
            onClick={ handleSubmit }
          >
            SEARCH
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
