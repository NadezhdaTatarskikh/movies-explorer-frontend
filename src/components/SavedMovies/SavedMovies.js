//import React, {useEffect} from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

const SavedMovies = ({ loggedIn, preloader, movies, onCheckbox, onSubmit, checked, isNotFound, savedMovies, onLike, onDelete, }) => {

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
        isNotFound={isNotFound}
        savedMovies={savedMovies}
        isSavedMoviesPage={false}
        />
      )}
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;

// SavedMovies — компонент страницы с сохранёнными карточками фильмов.
