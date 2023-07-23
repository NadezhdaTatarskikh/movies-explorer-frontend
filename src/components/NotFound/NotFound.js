import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = ({ onBack }) => {
  return (
    <main className='error-page'>
      <h1 className='error-page__title'>404</h1>
      <p className='error-page__subtitle'>Страница не найдена</p>
      <Link
        to='/'
        className='error-page__button'
        type='button'
        onClick={onBack}
      >
        Назад
      </Link>
    </main>
  );
};

export default NotFound;

// NotFound — компонент страницы c ошибкой 404.
