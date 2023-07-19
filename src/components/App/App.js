import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';

function App() {
  /**Переменные состояния зарегистрированного пользователя*/
  // eslint-disable-next-line
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <>
      <Routes>
        <Route path='/' element={<Main loggedIn={loggedIn} />} />
        <Route path='/movies' element={<Movies loggedIn={loggedIn} />} />
        <Route
          path='/saved-movies'
          element={<SavedMovies loggedIn={loggedIn} />}
        />
        <Route path='/profile' element={<Profile loggedIn={loggedIn} />} />
        <Route path='/signin' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

//App — корневой компонент приложения, его создаёт CRA.
