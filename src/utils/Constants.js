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