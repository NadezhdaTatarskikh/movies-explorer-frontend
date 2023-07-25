import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

const Navigation = ({ loggedIn }) => {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);

  const closePopups = () => {
    setIsBurgerMenuOpen(false);
  };

  const openPopup = () => {
    setIsBurgerMenuOpen(true);
  };
  return (
    <nav className='navigation'>
      {!loggedIn ? (
        <>
          <div className='navigation__auth'>
            <Link to='/signup' className='navigation__link'>
              Регистрация
            </Link>
            <Link
              to='signin'
              className='navigation__link navigation__link_active'
            >
              Войти
            </Link>
          </div>
        </>
      ) : (
        <div className='navigation__movies'>
          <NavLink className='navigation__movies-link' to='/movies'>
            Фильмы
          </NavLink>
          <NavLink className='navigation__movies-link' to='/saved-movies'>
            Сохранённые фильмы
          </NavLink>
          <nav className='navigation__account'>
            <Link to='/profile'>
              <button className='navigation__button-account' type='button'>
                Аккаунт
              </button>
            </Link>
          </nav>
          <button
            className='navigation__burger-button'
            type='button'
            onClick={openPopup}
          />
        </div>
      )}
      <BurgerMenu isOpen={isBurgerMenuOpen} onClose={closePopups} />
    </nav>
  );
};

export default Navigation;

// Navigation — компонент, который отвечает за меню навигации на сайте.
