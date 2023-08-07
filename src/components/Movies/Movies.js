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
  NUMBER_ADDED_CARDS_1,
  SCREEN_SM,
  SCREEN_MD,
  SCREEN_XL,
} from '../../utils/Constants';

const Movies = ({
  loggedIn,
  onSubmit,
  preloader,
  movies,
  searchKeyword,
  onCheckbox,
  checked
}) => {

  const width = useScreenWidth(); // получаем значение ширины экрана// получаем значения ширины экрана

  const [numberAddMovies, setNumberAddMovies] = useState(0); // число добавляемых карточек, при нажатии на кнопку ещё
  // eslint-disable-next-line no-unused-vars
  const [moviesList, setMoviesList] = useState(5); // стейт показываемых на странице карточек


  // эффект, устанавливаем кол-во карточек в зависимости от ширины карточек
  useEffect(() => {
    if (width >= SCREEN_XL) {
      setMoviesList(NUMBER_CARDS_12);
      numberAddMovies(NUMBER_ADDED_CARDS_3);
    } 
    else if (width > SCREEN_MD && width < SCREEN_XL) {
      setMoviesList(NUMBER_CARDS_8);
      setNumberAddMovies(NUMBER_ADDED_CARDS_2);
    }
    else if (width <= SCREEN_SM) {
      setMoviesList(NUMBER_CARDS_5);
      setNumberAddMovies(NUMBER_ADDED_CARDS_1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

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

        {preloader ? <Preloader /> : <MoviesCardList movies={movies} />}
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
