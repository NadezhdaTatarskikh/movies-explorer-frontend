import React from 'react';
import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({ loggedIn }) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <main className='saved-movies'>
        <SearchForm />
        <MoviesCardList isMovies={false} />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;


// SavedMovies — компонент страницы с сохранёнными карточками фильмов.