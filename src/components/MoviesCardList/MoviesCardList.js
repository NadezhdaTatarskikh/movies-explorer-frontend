import { useState, useEffect } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';
import { useScreenWidth } from '../../hooks/useScreenWidth';
import {
  WINDOW_SIZE_1280,
  WINDOW_SIZE_768,
  WINDOW_SIZE_468,
  NUMBER_CARDS_12,
  NUMBER_CARDS_8,
  NUMBER_CARDS_6,
  NUMBER_CARDS_5,
  NUMBER_ADDED_CARDS_3,
  NUMBER_ADDED_CARDS_2,
  NUMBER_ADDED_CARDS_1
} from '../../utils/Constants';

const MoviesCardList = ({ movies, errorText }) => {
  const windowWidth = useScreenWidth(); // получаем значение ширины экрана
  const [numberAddMovies, setNumberAddMovies] = useState({}); // число добавляемых карточек, при нажатии на кнопку ещё
  // eslint-disable-next-line no-unused-vars
  const [moviesList, setMoviesList] = useState({}); // стейт показываемых на странице карточек


  // эффект, устанавливаем кол-во карточек в зависимости от ширины карточек
  useEffect(() => {
    if (windowWidth >= WINDOW_SIZE_1280) {
      setMoviesList(NUMBER_CARDS_12);
      numberAddMovies(NUMBER_ADDED_CARDS_3);
    } 
    if (windowWidth < WINDOW_SIZE_1280 && windowWidth >= WINDOW_SIZE_768) {
      setMoviesList(NUMBER_CARDS_8);
      setNumberAddMovies(NUMBER_ADDED_CARDS_2);
    }
    if (windowWidth < WINDOW_SIZE_768 && windowWidth >= WINDOW_SIZE_468) {
      setMoviesList(NUMBER_CARDS_6);
      setNumberAddMovies(NUMBER_ADDED_CARDS_1);
    }
    if (windowWidth < WINDOW_SIZE_468) {
      setMoviesList(NUMBER_CARDS_5);
      setNumberAddMovies(NUMBER_ADDED_CARDS_1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  return (
    <section className='cards'>
      <span className='movies__error'>{errorText}</span>
      <ul className='cards__list'>
        {movies.slice(0, moviesList).map((movie) => (
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
