import { useContext, useEffect, useState } from "react";
import "./Profile.css";
import Header from "../Header/Header";
import ButtonSubmit from "../ButtonSubmit/ButtonSubmit";
import { useFormValidation } from "../../hooks/useFormValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Profile = ({
  onUpdateUser,
  loggedIn,
  logOut,
  setIsEditUserInfoStatus
}) => {
  const { values, handleChange, errors, isValid, setValues, resetForm } =
    useFormValidation();
  const currentUser = useContext(CurrentUserContext);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  const disableButton = (!isValid ||
    (currentUser.name === values.name && currentUser.email === values.email));

  // отображаем текущие данные в инпутах
  useEffect(() => {
    setIsInputDisabled(false);
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
  }, [currentUser, setValues, setIsInputDisabled])

  // Передаём значения управляемых компонентов во внешний обработчик
  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    if (isValid) {
      onUpdateUser({
        name: values.name,
        email: values.email,
      });
      resetForm();
    }
  }

  function handleEditProfile() {
    setIsInputDisabled(true);
  }

  function handleSave() {
    setIsSuccess(true);
  }

  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form className="profile__form" noValidate onSubmit={handleSubmit}>
          <div className="profile__data">
            <label className="profile__label" htmlFor="name">
              Имя
            </label>
            <input
              className="profile__input"
              id="profile__name"
              type="text"
              name="name"
               placeholder='Введите имя'
              required
              minLength="2"
              maxLength="30"
              value={values?.name ?? currentUser.name}
              disabled={isInputDisabled ? false : true}
              onChange={handleChange}
            />
          </div>
          <span className="profile__input-error">{errors.name || ""}</span>
          <div className="profile__line"></div>
          <div className="profile__data">
            <label className="profile__label" htmlFor="email">
              E-mail
            </label>
            <input
              className="profile__input"
              id="profile__email"
              type="text"
              name="email"
              required
              value={values?.email ?? currentUser.email}
              disabled={isInputDisabled ? false : true}
              onChange={handleChange}
            />
          </div>
          <span className="profile__input-error">{errors.email || ""}</span>
          {isSuccess && (
            <p className="profile__form-status">{setIsEditUserInfoStatus}</p>
          )}
          <div className="profile__button-container">
            {!isInputDisabled ? (
              <>
                <button
                  className="profile__button profile__button_disabled"
                  type="button"
                  onClick={handleEditProfile}
                >
                  Редактировать
                </button>
                <button
                  to="/"
                  className="profile__button profile__button_exit"
                  type="button"
                  onClick={logOut}
                >
                  Выйти из аккаунта
                </button>
              </>
            ) : (
              <ButtonSubmit
                type="submit"
                text="Сохранить"
                disabled={disableButton}
                onClick={handleSave}
              />
            )}
          </div>
        </form>
      </section>
    </>
  );
};


export default Profile;

// Profile — компонент страницы изменения профиля.
