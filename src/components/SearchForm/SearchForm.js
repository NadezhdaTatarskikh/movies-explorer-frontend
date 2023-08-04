import { useEffect, useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({ onSubmit, onCheckbox, checked, defaultValue }) => {
  const [errorText, setErrorText] = useState(''); // Переменная состояния ошибки
  const [keyword, setKeyword] = useState(''); // ВВедёные значения по ключевому слову

  // обработчик вводимых данных
  const handleChangeKeyword = (evt) => {
    setKeyword(evt.target.value);
    const isValid = evt.target.closest('form').checkValidity();
    if (isValid) {
      setErrorText('');
    }
  };
  // обработчик сабмита формы
  const handleFormSubmit = (evt) => {
    evt.preventDefault(); // отменяем действие по умолчанию
    const isValid = evt.target.closest('form').checkValidity();
    if (!isValid) {
      setErrorText('Введите ключевое слово');
      return;
    }
    onSubmit(keyword);
  };

  // Эффект отслеживания состояния поля input поиска
  useEffect(() => {
    setKeyword(defaultValue);
  }, [defaultValue]);

  return (
    <form className='searchform' noValidate onSubmit={handleFormSubmit}>
      <div className='searchform__input-container'>
        <input
          className='searchform__input'
          id='movie'
          name='movie'
          type='text'
          placeholder='Фильм'
          required
          minLength='1'
          maxLength='20'
          value={keyword || ''}
          onChange={handleChangeKeyword}
        ></input>
        <button className='searchform__button' type='submit'>
          Найти
        </button>
      </div>
      <span className='searchform__error'>{errorText}</span>
      <FilterCheckbox onCheckbox={onCheckbox} checked={checked} />
    </form>
  );
};

export default SearchForm;

// SearchForm — форма поиска, куда пользователь будет вводить запрос.
