import { useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({
  movies,
  checkLike,
  onDelete,
  onSaveMovie,
  isMoviesPage,
  isNotFound,
  isServerError,
  allMovies,
}) => {


  return (
    <section className='cards'>
       <p className={isNotFound ? 'cards__errors_visible' : 'cards__errors'}>
        Результаты не найдены
      </p>
      <p className={isServerError ? 'cards__errors_visible' : 'cards__errors'}>
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз
      </p>
      <ul className='cards__list'>
        {movies.map((movie) => (
          <MoviesCard
            movie={movie}
            key={movie.id || movie.movieId}
            checkLike={checkLike}
            onDelete={onDelete}
            onSaveMovie={onSaveMovie}
            isMoviesPage={isMoviesPage}
          />
        ))}
      </ul>
    </section>
  );
};

export default MoviesCardList;
