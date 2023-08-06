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

// фильтрация по длительности фильма
export const filterShortMovies = (movies) => {
  return movies.filter(movie => movie.duration < SHORT_MOVIES);
}


 


