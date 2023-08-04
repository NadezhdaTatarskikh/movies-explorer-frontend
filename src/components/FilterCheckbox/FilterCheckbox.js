import './FilterCheckbox.css';

const FilterCheckbox = (onCheckbox, checked) => {
  return (
    <div className='checkbox'>
      <input
        className='checkbox__input'
        name='checkbox'
        onChange={onCheckbox}
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
