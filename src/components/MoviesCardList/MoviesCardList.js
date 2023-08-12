import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { ERRORS } from '../../utils/Constants';

const MoviesCardList = ({
  movies,
  checkLike,
  onDelete,
  onSaveMovie,
  isMoviesPage,
  isNotFound,
  isServerError,
}) => {


  return (
    <section className='cards'>
       <p className={isNotFound ? 'cards__errors_visible' : 'cards__errors'}>
        {ERRORS.NOT_FOUND}
      </p>
      <p className={isServerError ? 'cards__errors_visible' : 'cards__errors'}>
        {ERRORS.SEARCH_ERROR}
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
