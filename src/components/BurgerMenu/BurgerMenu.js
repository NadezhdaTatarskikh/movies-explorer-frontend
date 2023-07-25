import './BurgerMenu.css';
import { NavLink, Link } from 'react-router-dom';

const BurgerMenu = ({ onClose, isOpen }) => {
  const popupIsOpen = isOpen ? 'burger_is-active' : '';

  return (
    <div className={`burger ${popupIsOpen}`}>
      <div className='burger__container'>
        <button type='button' className='burger__close' onClick={onClose} />
        <div className='burger__menu'>
          <NavLink to='/' className='burger__link'>
            Главная
          </NavLink>
          <NavLink to='/movies' className='burger__link'>
            Фильмы
          </NavLink>
          <NavLink to='/saved-movies' className='burger__link'>
            Сохранённые фильмы
          </NavLink>
        </div>
        <Link to='/profile'>
          <button className='burger__button-account' type='button'>
            Аккаунт
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BurgerMenu;

// BurgerMenu — компонент, для отображинии навигации на не больших разрешениях экрана.
