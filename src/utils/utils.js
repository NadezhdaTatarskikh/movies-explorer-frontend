import { SHORT_MOVIES } from '../utils/Constants';

// функция преобразования длительности фильмов
export const convertMinToHours = (number) => {
  const minutes = number % 60;
  const hours = (number - minutes) / 60;
  if (hours === 0) {
    return `${minutes}м`;
  } else if (minutes === 0) {
    return `${hours}ч`;
  } else {
    return `${hours}ч ${minutes}м`;
  }
};

// обработчик поискового запроса по ключевому слову
export const searchMovies = (movies, keyword, checkbox) => {
  const moviesSearchКeyword = movies.filter((movie) => {
    const movieNameRu = String(movie.nameRU).toLowerCase().trim(); // записываем русское название в нижнем регистре в переменную
    const movieNameEn = String(movie.nameEN).toLowerCase().trim(); // записываем английское название в нижнем регистре в переменную
    const keywordMovie = keyword.toLowerCase().trim(); // записываем текст запроса в нижнем регистре в переменную
    return movieNameRu.indexOf(keywordMovie) !== -1 || movieNameEn.indexOf(keywordMovie) !== -1; // при совпадении добавляем в moviesFound
  });
  if (checkbox) {
    return filterShortMovies(moviesSearchКeyword);
  } else {
    return moviesSearchКeyword;
  }
};
// фильтрация по длительности фильма
export const filterShortMovies = (movies) => {
  return movies.filter((movie) => movie.duration < SHORT_MOVIES);
};
