import React from 'react';
import './NavTab.css';

const NavTab = () => {
  return (
    <nav className='nav-info'>
      <ul className='nav-info__list'>
        <li className='nav-info__item'>
          <a className='nav-info__link' href='#about-project'>
            О проекте
          </a>
        </li>
        <li className='nav-info__item'>
          <a className='link nav-info__link' href='#techs'>
            Технологии
          </a>
        </li>
        <li className='nav-info__item'>
          <a className='link nav-info__link' href='#student'>
            Студент
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;

// NavTab — компонент с навигацией по странице «О проекте».
