import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <section className='error-page'>
      <h2 className='error-page__title'>404</h2>
      <p className='error-page__subtitle'>Страница не найдена</p>
      <Link to='/' className='error-page__button'>
        Назад
      </Link>
    </section>
  );
};

export default NotFound;

// NotFound — компонент страницы c ошибкой 404.
