import React from 'react';
import './MoviesCard.css';
//import Movie from '../../images/poster.png';
import { useLocation } from 'react-router-dom';
import { convertMinToHours } from '..//..//utils/utils';

const MoviesCard = ({ movie, onSaveMovie }) => {
  const location = useLocation().pathname; 

  const hadleSaveMovie = () => {
  onSaveMovie(movie)
}
  return (
    <li className='movies-card'>
      <a href={movie.trailerLink}
        target='_blank'
        rel='noreferrer'
        className='movies-cards__link'
      >
      <img
        className='movies-card__image'
        src={ location === '/movies'
        ? `https://api.nomoreparties.co/${movie.image.url}`:`${movie.image}`} alt={`постер к фильму ${movie.nameRU || movie.nameEN}`}/>
      </a>
      <div className='movies-card__description'>
        <h2 className='movies-card__name'>{movie.nameRU || movie.nameEN}</h2>
        <button className='movies-card__button' type='button' onClick={hadleSaveMovie}></button>
      </div>
      <p className='movies-card__duration'>{convertMinToHours(movie.duration)}</p>
    </li>
  );
};

export default MoviesCard;

// MoviesCard — компонент одной карточки фильма.
