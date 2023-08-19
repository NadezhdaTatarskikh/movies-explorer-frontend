import Preloader from '../Preloader/Preloader';
import { useState, useEffect } from 'react';
import { useScreenWidth } from '../../hooks/useScreenWidth';
import './Movies.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import {
  NUMBER_CARDS_12,
  NUMBER_CARDS_8,
  NUMBER_CARDS_5,
  NUMBER_ADDED_CARDS_3,
  NUMBER_ADDED_CARDS_2,
  SCREEN_MD,
  SCREEN_XL,
  SCREEN_XS,
  SCREEN_LG,
} from '../../utils/Constants';

const Movies = ({
  loggedIn,
  onSubmit,
  isLoading,
  isNotFound,
  isServerError,
  movies,
  onCheckbox,
  checked,
  checkLike,
  savedMovies,
  onSaveMovie,
  onDelete,
}) => {
  const screenWidth = useScreenWidth(); // получаем значение ширины экрана
  const [numberAddMovies, setNumberAddMovies] = useState(''); // число добавляемых карточек, при нажатии на кнопку ещё
  const [moviesList, setMoviesList] = useState({}); // стейт показываемых на странице карточек

  // эффект, устанавливаем кол-во карточек в зависимости от ширины карточек
  useEffect(() => {
    if (screenWidth > SCREEN_XL) {
      setMoviesList(NUMBER_CARDS_12);
      setNumberAddMovies(NUMBER_ADDED_CARDS_3);
    }
    if (screenWidth < SCREEN_LG && screenWidth >= SCREEN_MD) {
      setMoviesList(NUMBER_CARDS_8);
      setNumberAddMovies(NUMBER_ADDED_CARDS_2);
    }
    if (screenWidth < SCREEN_XS) {
      setMoviesList(NUMBER_CARDS_5);
      setNumberAddMovies(NUMBER_ADDED_CARDS_2);
    }
  }, [screenWidth]);

  // обработчик нажатий на кнопку 'Ещё'
  const handleButtonClick = () => {
    setMoviesList(moviesList + numberAddMovies);
  };

  const searchKeyword = localStorage.getItem('searchKeyword') || '';

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='movies'>
        <SearchForm
          onSubmit={onSubmit}
          onCheckbox={onCheckbox}
          checked={checked}
          defaultValue={searchKeyword}
        />
        {isLoading ? (
          <Preloader />
        ) : (
          <MoviesCardList
            movies={movies.slice(0, moviesList)}
            isNotFound={isNotFound}
            isServerError={isServerError}
            onSaveMovie={onSaveMovie}
            checkLike={checkLike}
            savedMovies={savedMovies}
            isMoviesPage={true}
            onDelete={onDelete}
          />
        )}
        <button
          className={
            movies.length <= 7 || moviesList >= movies.length
              ? 'movies__button_hidden'
              : 'movies__button'
          }
          type='button'
          onClick={handleButtonClick}
        >
          Ещё
        </button>
      </main>
      <Footer />
    </>
  );
};

export default Movies;

// Movies — компонент страницы с поиском по фильмам
