import { checkResponse, BASE_URL } from './Constants';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

// Получаем информацию о пользователе с сервера
export const getUserInfo = async (jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      ...headers,
      'Authorization': `Bearer ${jwt}`,
    }
  })
  .then((res) => checkResponse(res));
};

// Обновляем информацию о пользователе
export const editUserInfo = (data, jwt) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      ...headers,
      Authorization: `Bearer ${jwt}`,
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
    }),
  }).then((res) => checkResponse(res));
};


// Получаем все сохраненные фильмы пользователя
export const getSavedMovies = (jwt) => {
  return fetch(`${BASE_URL}/movies`, {
     method: 'GET',
     headers: {
        ...headers,
        'Authorization': `Bearer ${jwt}`,
     }
  }).then((res) => checkResponse(res))
};


//const mainApi = new MainApi({
//  url: 'http://localhost:3000',
//url: 'https://api.tatarskikhna.diploma.nomoreparties.sbs',
//  headers: {
//    'content-type': 'application/json',
//   Authorization: '',
//  },
//});


//export default mainApi;
