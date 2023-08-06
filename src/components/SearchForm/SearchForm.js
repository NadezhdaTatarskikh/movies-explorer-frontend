import { useEffect, useState } from 'react';
import './SearchForm.css';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import { useFormValidation } from '../../hooks/useFormValidation';

const SearchForm = ({ onSubmit, onCheckbox, checked, defaultValue }) => {
  const [keyword, setKeyword] = useState(''); // ВВедёные значения по ключевому слову
  const [errorText, setErrorText] = useState(''); // Переменная состояния ошибки
  const {values, handleChange} = useFormValidation();

   // Эффект отслеживания состояния поля input поиска
   useEffect(() => {
    setKeyword(defaultValue);
  }, [defaultValue]);

  // обработчик вводимых данных
  const onChange = (evt) => {
    setKeyword(evt.target.value);
    handleChange(evt)
   }

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
          value={keyword || values}
          onChange={onChange}
        ></input>
        <button className='searchform__button' type='submit' >
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
