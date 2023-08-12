//import React, {useEffect} from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ loggedIn, movies, onCheckbox, checkLike, onSubmit, checked, savedMovies, onLike, onDelete }) => {
  
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='saved-movies'>
        <SearchForm 
        onCheckbox={onCheckbox}
        checked={checked}
        onSubmit={onSubmit}
        />
        <MoviesCardList 
        movies={movies}
        onDelete={onDelete}
        onLike={onLike}
        savedMovies={savedMovies}
        isMoviesPage={false} 
        checkLike={checkLike}
        />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;

// SavedMovies — компонент страницы с сохранёнными карточками фильмов.
