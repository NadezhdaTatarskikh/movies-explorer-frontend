import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as mainApi from "../../utils/MainApi";
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import * as apiAuth from "../../utils/apiAuth";
import * as moviesApi from "../../utils/MoviesApi";
import { SHORT_MOVIES } from '../../utils/Constants';
//import { searchMovies, filterShortMovies } from "../../utils/utils";

function App() {
  // Стейты состояния пользователя
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditUserInfoStatus, setIsEditUserInfoStatus] = useState("");

  // Стейты состояния ошибок
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState();
  // eslint-disable-next-line no-unused-vars
  const [isServerError, setIsServerError] = useState(false); //Произошла ошибка при поиске фильмов
  // eslint-disable-next-line no-unused-vars
  const [isNotFound, setIsNotFound] = useState(false); // Фильмы по запросу не найдены
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false); // // стейт загрузки данных

  // Стейты состояния по фильмам
  //const [allMovies, setAllMovies] = useState([]); // Данные всех фильмов
  // eslint-disable-next-line no-unused-vars
  const [listFoundMovies, setListFoundMovies] = useState([]); // Список найденных фильмов
  // eslint-disable-next-line no-unused-vars
  const [foundMoviesList, setFoundMoviesList] = useState([]); // Список фильмов найденных по критериям

  // Стейты состояния по фильмам
  const [movies, setMovies] = useState([]); // Данные всех фильмов
  const [savedMovies, setSavedMovies] = useState([]); // стейт сохранённых фильмов (массив)
  // eslint-disable-next-line no-unused-vars
  const [showAllMovies, setShowAllMovies] = useState(savedMovies);
  // eslint-disable-next-line no-unused-vars
  const [filterSavedMovies, setFilterSavedMovies] = useState(showAllMovies);

  // Стейты состояния для формы поиска фильмов
  // eslint-disable-next-line no-unused-vars
  const [shortMovieCheckbox, setShortMovieCheckbox] = useState(false); // Флажок короткометражек не выбран
  const [searchKeyword, setSearchKeyword] = useState(""); // Ключевое слово
  // eslint-disable-next-line no-unused-vars
  const [shortSavedMovieCheckbox, setShortSavedMovieCheckbox] = useState(false);

  //добавили хук истории
  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);

// обработчик поискового запроса по ключевому слову
const searchMovies = (movies, keyword, checkbox) => {
  const moviesSearchКeyword = movies.filter((movie) => {
    return movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) || movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
  })
  if (checkbox) {
    return filterShortMovies(moviesSearchКeyword);
  } else {
    return moviesSearchКeyword;
  }
}

// фильтрация по длительности фильма
const filterShortMovies = (movies) => {
  return movies.filter(movie => movie.duration < SHORT_MOVIES);
}

// Поиск среди сохранённых фильмов
const handleSearchSavedMovies = (keyword) => {
  // присваиваем variables
  const variables = (savedMovies, keyword, shortSavedMovieCheckbox);
  if (searchMovies(variables).length === 0) {
    setIsNotFound(true);
  } else {
    setIsNotFound(false);
    setFilterSavedMovies(searchMovies(variables));
    setShowAllMovies(searchMovies(variables));
  }
};


  // обработчик проверки токена пользователя
  const handleTokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
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
      });
    mainApi
      .getSavedMovies(jwt)
      .then((data) => {
        setLoggedIn(true);
        setSavedMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Регистрация пользователи
  const handleRegistration = ({ name, email, password }) => {
    apiAuth
      .register({ name, email, password })
      .then(() => {
        handleAuthorization({ email, password });
      })
      .catch((err) => {
        if (err === "Ошибка: 409") {
          console.log(err);
          setErrorMessage("Пользователь с таким email уже существует");
        } else {
          setErrorMessage("Переданы некорректные данные");
        }
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(""), 3000);
      });
  };

  // Авторизация пользователя
  const handleAuthorization = ({ email, password }) => {
    apiAuth
      .login({ email, password })
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          handleTokenCheck();
          navigate("/movies");
        }
      })
      .catch((err) => {
        if (err === "Ошибка: 401") {
          setErrorMessage("Неверный email или пароль");
        } else {
          setErrorMessage("Что-то пошло не так...");
        }
        setLoggedIn(false);
        localStorage.removeItem("jwt");
        setCurrentUser(null);
      })
      .finally(() => {
        setTimeout(() => setErrorMessage(""), 3000);
      });
  };

  useEffect(() => {
    if (loggedIn) {
      Promise.all([mainApi.getUserInfo(), moviesApi.getAllMovies()])
        .then(([userInfo, userMovies]) => {
          console.log(userInfo);
          console.log(userMovies);
          setCurrentUser(userInfo);
          localStorage.setItem("movies", JSON.stringify(userMovies));
          setMovies(JSON.parse(localStorage.getItem("movies")));
        })
        .catch((err) => {
          console.log(`Произошла ошибка: ${err}`);
        });
    }
  }, [loggedIn]);

  // Изменяем данные пользователя
  const handleUpdateUser = (data) => {
    setIsEditUserInfoStatus(true);
    const jwt = localStorage.getItem("jwt");
    mainApi
      .editUserInfo(data, jwt)
      .then(() => {
        setCurrentUser(data);
        setIsEditUserInfoStatus("Данные успешно обновлены!");
      })
      .catch((err) => {
        console.log(err);
        if (err === "Ошибка: 409") {
          setIsEditUserInfoStatus(
            "Пользователь с таким email уже зарегистрирован"
          );
        } else {
          setIsEditUserInfoStatus("При обновлении профиля произошла ошибка");
        }
      })
      .finally(() => setIsEditUserInfoStatus(false));
  };
 

  // Выйти из аккаунта
  const handleLogOut = () => {
    localStorage.clear();
    setLoggedIn(false);
    setSavedMovies([]);
    setSearchKeyword("");
    navigate("/"); //Делаем переадресацию на главную страницу
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={
              <ProtectedRoute
                element={Movies}
                loggedIn={loggedIn}
                SavedMovies={savedMovies}
                movies={movies}
                isLoading={isLoading}             
                searchKeyword={searchKeyword}
                checked={shortMovieCheckbox}
                isNotFound={isNotFound}
                isServerError={isServerError}
                savedMovies={savedMovies}
              />
            }
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute
                element={SavedMovies}
                loggedIn={loggedIn}
                SavedMovies={savedMovies}
                movies={showAllMovies}
                saveMovie={savedMovies}
                isNotFound={isNotFound}
                checked={shortSavedMovieCheckbox}
                onSubmit={handleSearchSavedMovies}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute
                element={Profile}
                loggedIn={loggedIn}
                onUpdateUser={handleUpdateUser}
                logOut={handleLogOut}
                setErrorMessage={setErrorMessage}
                isEditUserInfoStatus={isEditUserInfoStatus}
              />
            }
          />
          <Route
            path="/signin"
            element={<Login onLogin={handleAuthorization} loggedIn={loggedIn} />}
          />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegistration} loggedIn={loggedIn} />}
          />
          <Route path="*" element={<NotFound onBack={goBack} />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

//App — корневой компонент приложения, его создаёт CRA.
