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
  SCREEN_LG
} from '../../utils/Constants';

const Movies = ({
  loggedIn,
  onSubmit,
  preloader,
  isNotFound,
  isServerError,
  movies,
  searchKeyword,
  onCheckbox,
  checked,
  onSaveMovie,
  isSaveMovies,
  savedMovies
}) => {

  const screenwidth = useScreenWidth(); // получаем значение ширины экрана 
  const [numberAddMovies, setNumberAddMovies] = useState({}); // число добавляемых карточек, при нажатии на кнопку ещё
  // eslint-disable-next-line no-unused-vars
  const [moviesList, setMoviesList] = useState({}); // стейт показываемых на странице карточек

  // эффект, устанавливаем кол-во карточек в зависимости от ширины карточек
  useEffect(() => {
    if (screenwidth > SCREEN_XL) {
      setMoviesList(NUMBER_CARDS_12);
      setNumberAddMovies(NUMBER_ADDED_CARDS_3);
    } 
    if (screenwidth < SCREEN_LG && screenwidth >= SCREEN_MD) {
      setMoviesList(NUMBER_CARDS_8);
      setNumberAddMovies(NUMBER_ADDED_CARDS_2);
    }
    if (screenwidth < SCREEN_XS) {
      setMoviesList(NUMBER_CARDS_5);
      setNumberAddMovies(NUMBER_ADDED_CARDS_2);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenwidth]);

  
  // обработчик нажатий на кнопку 'Ещё'
  const handleButtonClick = () => {
    setMoviesList(moviesList + numberAddMovies);
  }

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
        {preloader ? <Preloader /> : <MoviesCardList 
        movies={movies.slice(0, moviesList)} 
        isNotFound={isNotFound}
        isServerError={isServerError}
        onSaveMovie={onSaveMovie}
        isSaveMovies={isSaveMovies}
        savedMovies={savedMovies}
            />}
          <button
          className='movies__button'
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
