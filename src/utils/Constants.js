export const BASE_URL = 'https://api.tatarskikhna.diploma.nomoreparties.sbs';
export const MOVIE_URL = 'https://api.nomoreparties.co/beatfilm-movies';

//export const BASE_URL = 'http://localhost:3000'

//проверяем ответ с сервера 
export const checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    } 
    // если ошибка, отклоняем промис
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  // длительность короткометражек в минутах
export const SHORT_MOVIES = 40;

// Переменные количества отображаемых фильмов, зависит от ширины экрана
export const NUMBER_CARDS_12 = 12;
export const NUMBER_CARDS_8 = 8;
export const NUMBER_CARDS_6 = 6;
export const NUMBER_CARDS_5 = 5;

// Переменные сколько будет добавлено фильмов, зависит от ширины экрана
export const NUMBER_ADDED_CARDS_3 = 3;
export const NUMBER_ADDED_CARDS_2 = 2;
export const NUMBER_ADDED_CARDS_1 = 1;

// Переменные ширины экрана
export const MAX_WINDOW_SIZE = 1280;
export const MEDIUM_WINDOW_SIZE = 768;
export const MIN_WINDOW_SIZE = 468;