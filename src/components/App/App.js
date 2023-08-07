import React, { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Routes, Route, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import * as mainApi from '../../utils/MainApi';
import "./App.css";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import * as apiAuth from '../../utils/apiAuth';
import * as moviesApi from "../../utils/MoviesApi";
//import { SHORT_MOVIES } from '../../utils/Constants';


function App() {
 /**переменные состояния пользователя*/
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [isEditUserInfoStatus, setIsEditUserInfoStatus] = useState('');
  
  //* Переменные состояния ошибок 
  // eslint-disable-next-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState();
 
  // Переменные состояния по фильмам
  const [movies, setMovies] = useState([]); // Данные всех фильмов 
  
  const [savedMovies, setSavedMovies] = useState([]); // Сохраненные фильмы

 //* Переменные состояния для формы поиска фильмов
 //const [selectedCheckbox, setSelectedCheckbox] = useState(false); // Флажок короткометражек не выбран
 //const [searchKeyword, setSearchKeyword] = useState('') // Ключевое слово
 //const [checkboxSavedMovies, setCheckboxSavedMovies] = useState(false);


 
  
  //добавили хук истории
  const navigate = useNavigate();

  useEffect(() => {
    handleTokenCheck();
  }, [loggedIn]);

// обработчик проверки токена пользователя
const handleTokenCheck = () => {
  const jwt = localStorage.getItem("jwt");
  if (!jwt) {
    return;
  }
  mainApi
  .getUserInfo(jwt)
  .then((data)=> {
    setCurrentUser(data)
    setLoggedIn(true);
  })
  .catch((err) => {
    console.log(err);
  })
  mainApi
  .getSavedMovies(jwt)
  .then((data) => {
    setLoggedIn(true);
    setSavedMovies(data)
  })
  .catch((err) => {
    console.log(err);
  })
};

 // Регистрация пользователи
 const handleRegistration = ({ name, email, password }) => {
  apiAuth.register({ name, email, password })
    .then(() => {
      handleAuthorization({ email, password });
    })
    .catch((err) => {
      if (err === 'Ошибка: 409') {
        console.log(err)
        setErrorMessage('Пользователь с таким email уже существует')
      } else {
        setErrorMessage('Переданы некорректные данные');
      }
    })
    .finally(() => {
      setTimeout(() => setErrorMessage(''), 3000);
    });
}

// Авторизация пользователя
const handleAuthorization = ({ email, password }) => {
  apiAuth.login({ email, password })
    .then((res) => {
      if (res.token) {
        setLoggedIn(true);
        localStorage.setItem('jwt', res.token);
        handleTokenCheck()
        navigate('/movies');
      }
    })
    .catch((err) => {
      if (err === 'Ошибка: 401') {
        setErrorMessage('Неверный email или пароль')
      } else {
        setErrorMessage('Что-то пошло не так...');
      }
      setLoggedIn(false);
      localStorage.removeItem('jwt');
      setCurrentUser(null);
    })
    .finally(() => {
      setTimeout(() => setErrorMessage(''), 3000);
    });
}

useEffect(() => {
  if(loggedIn) {
    Promise.all([mainApi.getUserInfo(), moviesApi.getAllMovies()])
    .then(([userInfo, userMovies]) => {
      console.log(userInfo)
      console.log(userMovies);
      setCurrentUser(userInfo);
      localStorage.setItem('movies', JSON.stringify(userMovies));
      setMovies(JSON.parse(localStorage.getItem('movies')));
    })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
  }
}, [loggedIn]);



/**Изменяем данные пользователя*/
const handleUpdateUser = (data) => {
  setIsEditUserInfoStatus(true)
  const jwt = localStorage.getItem("jwt");
  mainApi.editUserInfo(data, jwt)
    .then(() => {
      setCurrentUser(data)
      setIsEditUserInfoStatus('Данные успешно обновлены!')
    })
    .catch((err) => {
      console.log(err)
      if (err === 'Ошибка: 409') {
        setIsEditUserInfoStatus('Пользователь с таким email уже зарегистрирован')
        } else {
          setIsEditUserInfoStatus('При обновлении профиля произошла ошибка');
        }
      })
      .finally(() => setIsEditUserInfoStatus(false)
      );
}





// Выйти из аккаунта
  const handleLogOut = () => {
    localStorage.clear()
    setLoggedIn(false);
    setSavedMovies([])

    //Делаем переадресацию на главную страницу
    navigate('/');
   
    //setInitialMovies([]);
  };

  

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<Main loggedIn={loggedIn} />} />
          <Route
            path="/movies"
            element={<ProtectedRoute 
              element={Movies} 
              loggedIn={loggedIn}
              SavedMovies={savedMovies}
              movies={movies} 
              />}
          />
          <Route
            path="/saved-movies"
            element={
              <ProtectedRoute 
              element={SavedMovies} 
              loggedIn={loggedIn} 
              SavedMovies={savedMovies}/>
            }
          />
          <Route
            path="/profile"
            element={<ProtectedRoute 
              element={Profile} 
              loggedIn={loggedIn} 
              onUpdateUser={handleUpdateUser} 
              logOut={handleLogOut} 
              setErrorMessage={setErrorMessage}
              isEditUserInfoStatus={isEditUserInfoStatus}
              />}
          />
          <Route path="/signin" element={<Login onLogin={handleAuthorization} />} />
          <Route path="/signup" element={<Register onRegister={handleRegistration} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

//App — корневой компонент приложения, его создаёт CRA.
