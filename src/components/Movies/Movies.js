import './Movies.css';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const Movies = ({ loggedIn, onSubmit, isLoading, savedMovies }) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='movies'>
        <SearchForm 
        onSubmit={onSubmit}
        />
        {isLoading ? ( 
          <Preloader />
        ) : (
        <MoviesCardList 
        savedMovies={savedMovies}
        />
        )}
        <button className='movies__button' type='button'>
          Ещё
        </button>
      </main>
      <Footer />
    </>
  );
};

export default Movies;

// Movies — компонент страницы с поиском по фильмам.
