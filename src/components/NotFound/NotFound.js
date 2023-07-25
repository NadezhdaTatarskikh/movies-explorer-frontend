import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <main className='error-page'>
      <h1 className='error-page__title'>404</h1>
      <p className='error-page__subtitle'>Страница не найдена</p>
      <button
        className='error-page__button'
        type='button'
        onClick={() => navigate(-1)}
      >
        Назад
      </button>
    </main>
  );
};

export default NotFound;

// NotFound — компонент страницы c ошибкой 404.
