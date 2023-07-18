import React from 'react';
import './MoviesCard.css';
import Movie from '../../images/poster.png';

const MoviesCard = () => {
  return (
    <div className='movies-card'>
      <img className='movies-card__image' src={Movie} alt='Постер фильма' />
      <div className='movies-card__description'>
        <h2 className='movies-card__name'>В погоне за Бенкси</h2>
        <button className='movies-card__button' type='button'></button>
      </div>
      <p className='movies-card__duration'>1ч 42м</p>
    </div>
  );
};

export default MoviesCard;

// MoviesCard — компонент одной карточки фильма.
