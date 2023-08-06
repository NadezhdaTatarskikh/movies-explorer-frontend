import './Movies.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = ({
  loggedIn,
  onSubmit,
  preloader,
  movies,
  searchKeyword,
  onCheckbox,
  checked,
  moviesList,
  setMoviesList,
  numberAddMovies,
}) => {
   
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

// Movies — компонент страницы с поиском по фильмам.
