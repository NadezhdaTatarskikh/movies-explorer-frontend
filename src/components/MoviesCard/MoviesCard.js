import React from 'react';
import './MoviesCard.css';
//import Movie from '../../images/poster.png';

const MoviesCard = ({movie}) => {
  return (
    <li className='movies-card'>
      <img
        className='movies-card__image'
        src={`https://api.nomoreparties.co/${movie.image.url}`} alt={`постер к фильму ${movie.name.RU || movie.name.EN}`}/>
      <div className='movies-card__description'>
        <h2 className='movies-card__name'>{movie.name.RU || movie.name.EN}</h2>
        <button className='movies-card__button' type='button'></button>
      </div>
      <p className='movies-card__duration'>{movie.duration}</p>
    </li>
  );
};

export default MoviesCard;

// MoviesCard — компонент одной карточки фильма.
