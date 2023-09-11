import './MoviesCard.css';
//import Movie from '../../images/poster.png';
import { useLocation } from 'react-router-dom';
import { convertMinToHours } from '../../utils/utils';

const MoviesCard = ({
  movie,
  onSaveMovie,
  onDelete,
  checkLike,
  isMoviesPage,
}) => {
  const location = useLocation().pathname;
  const isLiked = checkLike(movie);

  // для удобства сохраняем в переменную класс карточки
  const moviesButtonClassName = `movies-card__button ${
    isLiked ? 'movies-card__button movies-card__button_active' : ''
  }`;

  const onLike = () => {
    onSaveMovie(movie);
  };

  const handleDeleteMovie = () => {
    onDelete(movie);
  };

  return (
    <li className='movies-card'>
      <a
        href={movie.trailerLink}
        target='_blank'
        rel='noreferrer'
        className='movies-cards__link'
      >
        <img
          className='movies-card__image'
          src={
            location === '/movies'
              ? `https://api.nomoreparties.co/${movie.image.url}`
              : `${movie.image}`
          }
          alt={`постер к фильму ${movie.nameRU || movie.nameEN}`}
        />
      </a>
      <div className='movies-card__description'>
        <h2 className='movies-card__name'>{movie.nameRU || movie.nameEN}</h2>

        {isMoviesPage ? (
          <button
            className={moviesButtonClassName}
            type='button'
            onClick={isLiked ? handleDeleteMovie : onLike}
          />
        ) : (
          <button
            className='movies-card__button movies-card__button_delete'
            type='button'
            onClick={handleDeleteMovie}
          />
        )}
      </div>
      <p className='movies-card__duration'>
        {convertMinToHours(movie.duration)}
      </p>
    </li>
  );
};

export default MoviesCard;

// MoviesCard — компонент одной карточки фильма.
