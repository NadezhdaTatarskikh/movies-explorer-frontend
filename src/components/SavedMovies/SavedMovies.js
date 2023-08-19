import './SavedMovies.css';
import SearchForm from '../SearchForm/SearchForm';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

const SavedMovies = ({
  loggedIn,
  movies,
  onCheckbox,
  checkLike,
  onSubmit,
  checked,
  isNotFoundSaved,
  savedMovies,
  onLike,
  onDelete,
}) => {
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
          isNotFoundSaved={isNotFoundSaved}
        />
      </main>
      <Footer />
    </>
  );
};

export default SavedMovies;

// SavedMovies — компонент страницы с сохранёнными карточками фильмов.
