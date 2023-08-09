//import React, {useEffect} from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({ loggedIn, preloader, movies, isSaveMovies, onCheckbox, onSubmit, checked, isNotFound, savedMovies, onLike, onDelete, }) => {

//  useEffect(() => {
//    return () => {
//      resetSearchSavedMovies();
//      if (!checked) searchMovies();
//    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
//  }, []);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='saved-movies'>
        <SearchForm 
        onCheckbox={onCheckbox}
        checked={checked}
        onSubmit={onSubmit}
        />
        {preloader ? (
          <Preloader />
      ) : (
        <MoviesCardList 
        movies={movies}
        onDelete={onDelete}
        onLike={onLike}
        isSaveMovies={isSaveMovies}
        isNotFound={isNotFound}
        savedMovies={savedMovies}
        />
      )}
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;

// SavedMovies — компонент страницы с сохранёнными карточками фильмов.
