import React, { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import ProtectedRoute from '../Route/ProtectedRoute';
import * as mainApi from '../../utils/MainApi';
import './App.css';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import NotFound from '../NotFound/NotFound';
import * as apiAuth from '../../utils/apiAuth';
import * as moviesApi from '../../utils/MoviesApi';
import { searchMovies, filterShortMovies } from '../../utils/utils';
import { RES_ERRORS, ERRORS } from '../../utils/Constants';

function App() {
  // Стейты состояния пользователя
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditUserInfoStatus, setIsEditUserInfoStatus] = useState('');
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  // Стейты ошибок
  const [errorMessage, setErrorMessage] = useState();
  const [isServerError, setIsServerError] = useState(false); //Произошла ошибка при поиске фильмов
  const [isNotFound, setIsNotFound] = useState(false); // Фильмы по запросу не найдены
  const [isLoading, setIsLoading] = useState(false); // // стейт загрузки данных
  const [isNotFoundSaved, setIsNotFoundSaved] = useState(false);

  // Стейты состояния по фильмам
  const [allMovies, setAllMovies] = useState([]); // Данные всех фильмов
  const [listFoundMovies, setListFoundMovies] = useState([]); // Список найденных фильмов
  const [foundMoviesList, setFoundMoviesList] = useState([]); // Список фильмов найденных по критериям

  // Стейты состояния по фильмам
  const [savedMovies, setSavedMovies] = useState([]); // стейт сохранённых фильмов (массив)
  const [showAllMovies, setShowAllMovies] = useState(savedMovies);
  const [filterSavedMovies, setFilterSavedMovies] = useState(showAllMovies);

  // Стейты состояния для формы поиска фильмов
  const [shortMovieCheckbox, setShortMovieCheckbox] = useState(false); // стейт флажок короткометражек не выбран
  const [searchKeyword, setSearchKeyword] = useState(''); // Ключевое слово
  const [shortSavedMovieCheckbox, setShortSavedMovieCheckbox] = useState(false);

  //добавили хук истории
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn)
    handleTokenCheck();
  }, [loggedIn]);

  // обработчик проверки токена пользователя
  const handleTokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      setIsTokenChecked(true);
      return;
    }
    mainApi
      .getUserInfo(jwt)
      .then((data) => {
        setCurrentUser(data);
        setLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      })
      .finally(() => setIsTokenChecked(true));
    mainApi
      .getSavedMovies(jwt)
      .then((data) => {
        setLoggedIn(true);
        setSavedMovies(data);
        setFilterSavedMovies(data);  
        setShowAllMovies(data);
      })
      .catch((err) => {
        console.log(err);
        setLoggedIn(false);
      });
  };

  // Регистрации пользователя, принимает name, email, password, далее автоматически идёт авторизация
  const handleRegistration = ({ name, email, password }) => {
    apiAuth
      .register({ name, email, password })
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch((err) => {
        if (err === 'Ошибка: 500') {
          console.log(err)
          setErrorMessage(RES_ERRORS.SERVER_500);
        }
        if (err === 'Ошибка: 409') {
          console.log(err);
          setErrorMessage(RES_ERRORS.REGISTRATION_409);
        } else {
          setErrorMessage(RES_ERRORS.REGISTRATION_DEFAUTLT);
        }
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  // Авторизация пользователя
  const handleAuthorization = ({ email, password }) => {
    apiAuth
      .login({ email, password })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem('jwt', res.token); // токен хранится в localstorage
          handleTokenCheck();
          navigate('/movies'); // автоматическая переадресация на страницу movies
        }
        Promise.all([mainApi.getUserInfo(), moviesApi.getAllMovies()]).then(
          ([userInfo, userMovies]) => {
            console.log(userInfo);
            console.log(userMovies);
            setCurrentUser(userInfo); // данные записываются в глобальную стейт-переменную
            localStorage.setItem('movies', JSON.stringify(userMovies));
            setAllMovies(JSON.parse(localStorage.getItem('movies')));
          }
        );
      })
      .catch((err) => {
        if (err === 'Ошибка: 500') {
          setErrorMessage(RES_ERRORS.SERVER_500);
        }
        if (err === 'Ошибка: 401') {
          setErrorMessage(RES_ERRORS.AUTHORIZATION_401);
        } else {
          setErrorMessage(RES_ERRORS.AUTHORIZATION_DEFAULT);
        }
        setLoggedIn(false);
        localStorage.removeItem('jwt');
        setCurrentUser(null);
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(''), 3000);
      });
  };

  // Изменяем данные пользователя
  const handleUpdateUser = (data) => {
    setIsEditUserInfoStatus(true);
    const jwt = localStorage.getItem('jwt');
    mainApi
      .editUserInfo(data, jwt)
      .then(() => {
        setCurrentUser(data);
        setIsEditUserInfoStatus(RES_ERRORS.UPDATE_SUCCESS);
        setTimeout(() => setIsEditUserInfoStatus(''), 2500);
      })
      .catch((err) => {
        console.log(err);
        if (err === 'Ошибка: 409') {
          setIsEditUserInfoStatus(RES_ERRORS.UPDATE_PROFILE);
        } else {
          setIsEditUserInfoStatus(RES_ERRORS.UPDATE_DEFAULT_400);
        }
      })
  };
  // -------------------------SAVEDMOVIES----------------------------- //

  useEffect(() => {
    if (savedMovies.length === 0) return;
    if (!searchKeyword) return setErrorMessage(ERRORS.NEED_LETTERS);
    if (foundMoviesList.length === 0) {
      setErrorMessage(ERRORS.NOT_FOUND);
    } else {
      setErrorMessage('');
    }
  }, [foundMoviesList, savedMovies, searchKeyword]);


  // Отслеживаем состояние стэйта чекбокса
useEffect(() => {
  if (localStorage.getItem('shortSavedMovieCheckbox') === 'true') {
    setShortSavedMovieCheckbox(true);
    setShowAllMovies(filterShortMovies(savedMovies))
  } else {
    setShortSavedMovieCheckbox(false);
    setShowAllMovies(savedMovies);
  }
}, [savedMovies]);

  // Меняем состояние чекбокса на короткометражки
const handleChangeCheckboxSavedMovies = () => {
  setShortSavedMovieCheckbox(!shortSavedMovieCheckbox);
  if (!shortSavedMovieCheckbox) {
    localStorage.setItem('shortSavedMovieCheckbox', true);
    setShortSavedMovieCheckbox(true);
    setShowAllMovies(filterShortMovies(filterSavedMovies));
    if (filterShortMovies(filterSavedMovies).length === 0) {
      setIsNotFoundSaved(true);
    } 
    setIsNotFoundSaved(false);
  } else {
    setShortSavedMovieCheckbox(false);
    localStorage.setItem('shortSavedMovieCheckbox', false);
    if (filterSavedMovies.length === 0) {
      setIsNotFoundSaved(true);
      setShowAllMovies(filterSavedMovies);
    }
    setIsNotFoundSaved(false);
    setShowAllMovies(filterSavedMovies);
  }
};

  // Поиск среди сохранённых фильмов
  const handleSearchSavedMovies = (keyword) => {
    console.log(savedMovies);
    const foundSavedMovies = searchMovies(
      savedMovies,
      keyword,
      shortSavedMovieCheckbox
    );
    if (foundSavedMovies.length === 0) {
      setIsNotFoundSaved(true);
      setShowAllMovies(foundSavedMovies);
      setFilterSavedMovies(foundSavedMovies);
    } else {
      setIsNotFoundSaved(false);
      setFilterSavedMovies(foundSavedMovies);
      setShowAllMovies(foundSavedMovies);
    }
  };
  
const location = useLocation();

  useEffect (() => {
    if (location.pathname === '/saved-movies') {
      setShortSavedMovieCheckbox(false);
      setShowAllMovies(savedMovies);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // ------------------------------------MOVIES----------------------- //

  // Отслеживание состояния стэйтов
  useEffect(() => {
    setSearchKeyword(localStorage.getItem('searchKeyword' || ''));
    setShortMovieCheckbox(
      localStorage.getItem('shortMovieCheckbox' || '') === 'true'
    );
    if (localStorage.getItem('foundMoviesList')) {
      const movies = JSON.parse(localStorage.getItem('foundMoviesList'));
      setListFoundMovies(movies);
      if (localStorage.getItem('shortMovieCheckbox') === 'true') {
        setFoundMoviesList(filterShortMovies(movies));
      } else {
        setFoundMoviesList(movies);
      }
    }
  }, []);

  // Меняем состояние чекбокса на короткометражки
  const handleChangeCheckbox = () => {
    setShortMovieCheckbox(!shortMovieCheckbox);
    console.log(shortMovieCheckbox);
    if (!shortMovieCheckbox) {
      setFoundMoviesList(filterShortMovies(listFoundMovies));
      if (foundMoviesList.length === 0) {
        setIsNotFound(true);
      }
    } else {
      setFoundMoviesList(listFoundMovies);
    }
    localStorage.setItem('shortMovieCheckbox', !shortMovieCheckbox);
  };

  // обработчик поискового запроса по критериям
  const handleSetFilterMovies = (movies, keyword, checkbox) => {
    setIsLoading(true);
    // локально отфильтровываем фильмы согласно запросу
    const moviesList = searchMovies(movies, keyword, false);
    // если ничего не найдено - открывается сообщение об ошибке
    moviesList.length === 0 ? setIsNotFound(true) : setIsNotFound(false);
    // устанавливаем стейт setListFoundMovies
    setListFoundMovies(moviesList);
    // устанавливаем стейт filteredMoviesList в зависимости от состояния чекбокса
    setFoundMoviesList(checkbox ? filterShortMovies(moviesList) : moviesList);
    // создаём локальное хранилище foundMoviesList
    localStorage.setItem('foundMoviesList', JSON.stringify(moviesList));
    setTimeout(() => setIsLoading(false), 1000);
  };

   // Проверяем сохранение фильма
   const checkLike = (movie) => {
    return savedMovies.some((item) => item.movieId === movie.id);
  };

  // Обработаем запрос пользователя по поиску фильмов
  const handleRequestMovies = (keyword) => {
    localStorage.setItem('searchKeyword', keyword); // Записываем в сторедж введенное ключевое слово
    localStorage.setItem('shortMovieCheckbox', shortMovieCheckbox); // Записываем в сторедж выставленное положение флажка
    if (allMovies.length === 0) {
      // если фильмов в сторедж нет, сделаем запрос к BeatfilmMoviesApi
      setIsLoading(true);
      moviesApi
        .getAllMovies()
        .then((movies) => {
          setIsLoading(true);
          localStorage.setItem('allMovies', JSON.stringify(movies)); // Записываем в сторедж все полученные фильмы с BeatfilmMoviesApi
          setAllMovies(movies);
          handleSetFilterMovies(movies, keyword, shortMovieCheckbox); // Находим фильмы по запросу и выставленным критериям
        })
        .catch((err) => {
          setIsServerError(true);
          console.log(err);
        })
        .finally(() => {
          setTimeout(() => setIsLoading(false), 1000);
        });
    } else {
      handleSetFilterMovies(allMovies, keyword, shortMovieCheckbox);
    }
  };

  // Обработчик запоса на сохранённые фильмы
  const onLike = (movie) => {
    const jwt = localStorage.getItem('jwt');
    mainApi
      .addMovie(movie, jwt)
      .then((newMovie) => {
        setSavedMovies([...savedMovies, newMovie]);
        console.log('Карточка создана:', movie);
      })
      .catch((err) => {
        console.log('Ошибка при создании карточки:', err);
      });
  };

  // Обработчик запоса на удаления фильма с страницы 'Сохраненные фильмы'
  const handleDeleteMovie = (movie) => {
    const jwt = localStorage.getItem('jwt');
    const deleteCard = savedMovies.find(
      (item) => item.movieId === (movie.id || movie.movieId)
    );
    if (!deleteCard) return;
    mainApi
      .deleteMovie(deleteCard._id, jwt)
      .then(() => {
        setSavedMovies(savedMovies.filter((c) => c._id !== deleteCard._id));
        setFilterSavedMovies(savedMovies.filter((c) => c._id !== deleteCard._id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // обработчик выхода пользователя из аккаунта, обращение к API, очистка локального хранилища
  const handleLogOut = () => {
   localStorage.clear(); // удаление данных из localstorage
    // сбрасываем все стейты при разлогинивании
    setLoggedIn(false);
    handleTokenCheck(null);
    setIsLoading(false);
    setListFoundMovies([]);
    setSavedMovies([]);
    setFoundMoviesList(false);
    setShortMovieCheckbox(false);
    setSearchKeyword('');
    setFoundMoviesList([]);
    setCurrentUser({});
    setIsTokenChecked(false);
    setIsNotFoundSaved(false);
    setIsNotFound(false);
    // переадресация на главную страницу
    navigate('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          <Route path='/' element={<Main loggedIn={loggedIn} />} />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                isTokenChecked={isTokenChecked}
                movies={foundMoviesList}
                isLoading={isLoading}
                onSaveMovie={onLike}
                onCheckbox={handleChangeCheckbox}
                checked={shortMovieCheckbox}
                checkLike={checkLike}
                onSubmit={handleRequestMovies}
                isNotFound={isNotFound}
                isServerError={isServerError}
                savedMovies={savedMovies}
                onDelete={handleDeleteMovie}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                isTokenChecked={isTokenChecked}
                movies={showAllMovies}
                onSubmit={handleSearchSavedMovies}
                onCheckbox={handleChangeCheckboxSavedMovies}
                checkLike={checkLike}
                saveMovie={savedMovies}
                isNotFound={isNotFoundSaved}
                checked={shortSavedMovieCheckbox}
                onDelete={handleDeleteMovie}
              />
            }
          />
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                isTokenChecked={isTokenChecked}
                onUpdateUser={handleUpdateUser}
                logOut={handleLogOut}
                setErrorMessage={setErrorMessage}
                isEditUserInfoStatus={isEditUserInfoStatus}
              />
            }
          />
          <Route
            path='/signin'
            element={
              <Login
                onLogin={handleAuthorization}
                loggedIn={loggedIn}
                isTokenChecked={isTokenChecked}
                errorMessage={errorMessage}
              />
            }
          />
          <Route
            path='/signup'
            element={
              <Register
                onRegister={handleRegistration}
                loggedIn={loggedIn}
                isTokenChecked={isTokenChecked}
                errorMessage={errorMessage}
              />
            }
          />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

//App — корневой компонент приложения, его создаёт CRA.
