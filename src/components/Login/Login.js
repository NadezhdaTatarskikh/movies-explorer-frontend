import React from 'react';
import Auth from '../Auth/Auth';
import Form from '../Form/Form';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import AuthWithForm from '../AuthWithForm/AuthWithForm';

const Login = () => {
  return (
    <Auth
      title='Рады видеть!'
      subtitle='Ещё не зарегистрированы?'
      route='/signup'
      link='Регистрация'
    >
      <Form>
        <AuthWithForm
          label='E-mail'
          name='email'
          type='email'
          error=''
          required
        />
        <AuthWithForm
          label='Пароль'
          name='password'
          type='password'
          error=''
          minLength='8'
          required
        />
      </Form>
      <ButtonSubmit text='Войти' />
    </Auth>
  );
};

export default Login;


// Login — компонент страницы авторизации.