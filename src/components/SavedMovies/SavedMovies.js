import React, {useEffect} from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({ loggedIn, preloader, movies, onLike, onDelete, resetSearchSavedMovies, checked, searchMovies }) => {

  useEffect(() => {
    return () => {
      resetSearchSavedMovies();
      if (!checked) searchMovies();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='saved-movies'>
        <SearchForm 
        searchMovies={searchMovies}
        />
        {preloader ? (
          <Preloader />
      ) : (
        <MoviesCardList 
        movies={movies}
        onDelete={onDelete}
        onLike={onLike}
        />
      )}
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;

// SavedMovies — компонент страницы с сохранёнными карточками фильмов.
