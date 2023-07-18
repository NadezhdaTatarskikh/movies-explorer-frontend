import React from 'react';
import './Profile.css';
import Header from '../Header/Header';

const Profile = ({ loggedIn }) => {
  return (
    <>
      <Header loggedIn={loggedIn} />
      <section className='profile'>
        <h3 className='profile__title'>Привет, Надежда!</h3>
        <form className='profile__form'>
          <div className='profile__data'>
            <label className='profile__label'>Имя</label>
            <input
              className='profile__input'
              id='profile__name'
              type='text'
              name='name'
              placeholder='Ваше имя'
              required
              defaultValue='Надежда'
              minLength='2'
              maxLength='30'
            />
          </div>
          <div className='profile__line'></div>
          <div className='profile__data'>
            <label className='profile__label'>E-mail</label>
            <input
              className='profile__input'
              id='profile__email'
              type='text'
              name='email'
              placeholder='Ваш email'
              defaultValue='pochta@yandex.ru'
              required
            />
          </div>
          <div className='profile__button-container'>
            <button
              className='profile__button profile__button_edit'
              type='button'
            >
              Редактировать
            </button>
            <button
              className='profile__button profile__button_exit'
              type='button'
            >
              Выйти из аккаунта
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Profile;


// Profile — компонент страницы изменения профиля.