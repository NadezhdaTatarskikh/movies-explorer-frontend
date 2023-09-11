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
};

// длительность короткометражек в минутах
export const SHORT_MOVIES = 40;

// Переменные количества отображаемых фильмов, зависит от ширины экрана
export const NUMBER_CARDS_12 = 12;
export const NUMBER_CARDS_8 = 8;
export const NUMBER_CARDS_6 = 6;
export const NUMBER_CARDS_5 = 5;

// количество карточек, открывающихся при нажатиии кнопки 'ещё'
export const NUMBER_ADDED_CARDS_3 = 3;
export const NUMBER_ADDED_CARDS_2 = 2;
export const NUMBER_ADDED_CARDS_1 = 1;

// Переменные ширины экрана
export const SCREEN_XS = 480;
export const SCREEN_MD = 560;
export const SCREEN_LG = 1150;
export const SCREEN_XL = 1280;

export const RES_ERRORS = {
  SERVER_500: 'На сервере произошла ошибка',

  REGISTRATION_409: 'Пользователь с таким email уже существует',
  REGISTRATION_DEFAUTLT: 'Переданы некорректные данные',

  AUTHORIZATION_401: 'Вы ввели неправильный email или пароль',
  AUTHORIZATION_DEFAULT: 'Что-то пошло не так...',

  UPDATE_PROFILE: 'Пользователь с таким email уже существует',
  UPDATE_DEFAULT_400: 'При обновлении профиля произошла ошибка',
  UPDATE_SUCCESS: 'Данные успешно обновлены!',
};

export const ERRORS = {
  NOT_FOUND: 'Результаты не найдены',
  SEARCH_ERROR:
    'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
};
