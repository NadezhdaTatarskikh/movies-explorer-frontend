import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <div className='checkbox'>
      <input
        className='checkbox__input'
        id='checkbox'
        type='checkbox'
        value='yes'
      />
      <label className='checkbox__label' htmlFor='checkbox'>
        Короткометражки
      </label>
    </div>
  );
};

export default FilterCheckbox;

// FilterCheckbox — компонент для чекбокса короткометражки.
