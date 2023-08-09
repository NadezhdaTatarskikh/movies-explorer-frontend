import { useEffect, useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormValidation } from '../../hooks/useFormValidation';

const SearchForm = ({ onSubmit, onCheckbox, checked, defaultValue }) => {
  const [errorText, setErrorText] = useState(''); // Переменная состояния ошибки
  const [keyword, setKeyword] = useState(''); // ВВедёные значения по ключевому слову
  const {isValid, handleChange} = useFormValidation();

// Эффект отслеживания состояния поля input поиска
useEffect(() => {
  setKeyword(defaultValue);
}, [defaultValue]);

  // обработчик вводимых данных
  const handleFormChange = (evt) => {
    setKeyword(evt.target.value);
    handleChange(evt)
   }
  // обработчик сабмита формы
  const handleFormSubmit = (evt) => {
    evt.preventDefault(); // отменяем действие по умолчанию
    if (keyword) {
      onSubmit(keyword);
    } else {
      return setErrorText('Введите ключевое слово');   
    } 
  };

  return (
    <form className='searchform' onSubmit={handleFormSubmit} noValidate>
      <div className='searchform__input-container'>
        <input
          className='searchform__input'
          id='movie'
          name='movie'
          type='text'
          placeholder='Фильм'
          required
          minLength='2'
          maxLength='20'
          value={keyword || ''}
          onChange={handleFormChange}
        ></input>
        <button className='searchform__button' type='submit'>
          Найти
        </button>
      </div>
      <span className='searchform__error'>{!isValid && errorText}</span>
      <FilterCheckbox onCheckbox={onCheckbox} checked={checked} />
    </form>
  );
};

export default SearchForm;

// SearchForm — форма поиска, куда пользователь будет вводить запрос.
