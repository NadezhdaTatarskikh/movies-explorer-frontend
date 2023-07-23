import React from 'react';
import Auth from '../Auth/Auth';
import AuthWithForm from '../AuthWithForm/AuthWithForm';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import Form from '../Form/Form';

const Register = () => {
  return (
    <>
      <Auth
        title='Добро пожаловать!'
        subtitle='Уже зарегистрированы?'
        route='/signin'
        link='Войти'
      >
        <Form>
          <AuthWithForm
            label='Имя'
            name='name'
            type='text'
            placeholder='Имя'
            error=''
            minLength='2'
            maxLength='30'
            required
          />
          <AuthWithForm
            label='E-mail'
            name='email'
            type='email'
            placeholder='E-mail'
            minLength='8'
            maxLength='30'
            error=''
            required
          />
          <AuthWithForm
            label='Пароль'
            name='password'
            type='password'
            placeholder='Пароль'
            minLength='8'
            maxLength='30'
            error='Что-то пошло не так...'
            required
          />
        </Form>
        <ButtonSubmit text='Зарегистрироваться' />
      </Auth>
    </>
  );
};

export default Register;

// Register — компонент страницы регистрации.
