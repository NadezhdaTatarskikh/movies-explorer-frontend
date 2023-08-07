
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';


const MoviesCardList = ({ movies, errorText }) => {
 

  return (
    <section className='cards'>
      <span className='movies__error'>{errorText}</span>
      <ul className='cards__list'>
        {movies.map((movie) => (
          <MoviesCard 
            key={movie.id || movie.movieId} 
            movie={movie} />
        ))}
      </ul>
    </section>
  );
};

export default MoviesCardList;

// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
