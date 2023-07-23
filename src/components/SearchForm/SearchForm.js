import React from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = () => {
  return (
    <form className='searchform'>
      <div className='searchform__input-container'>
        <input
          className='searchform__input'
          placeholder='Фильм'
          required
        ></input>
        <button className='searchform__button' type='submit'>
          Найти
        </button>
      </div>
      <FilterCheckbox />
    </form>
  );
};

export default SearchForm;

// SearchForm — форма поиска, куда пользователь будет вводить запрос.
