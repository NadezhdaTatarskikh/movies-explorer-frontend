import { useState } from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = (onCheckbox, checked) => {
  const [checkbox, setCheckbox] = useState(false);
  const handleCheckbox = () => {
    setCheckbox(!checkbox);
  }
  return (
    <div className='checkbox'>
      <input
        className='checkbox__input'
        name='checkbox'
        onChange={handleCheckbox}
        id='checkbox'
        type='checkbox'
        value='yes'
        checked={checked}
      />
      <label className='checkbox__label' htmlFor='checkbox'>
        Короткометражки
      </label>
    </div>
  );
};

export default FilterCheckbox;

// FilterCheckbox — компонент для чекбокса короткометражки.
