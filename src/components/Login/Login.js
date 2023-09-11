import React from 'react';
import Auth from '../Auth/Auth';
import Form from '../Form/Form';
import AuthWithForm from '../AuthWithForm/AuthWithForm';
import { useFormValidation } from '../../hooks/useFormValidation';
import { Navigate } from 'react-router-dom';

const Login = ({ onLogin, errorMessage, loggedIn }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

    // обработчик отправки данных из формы
  const handleSubmit = (evt) => {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    if (!values.password || !values.email) {
      // если не введен email или password - ничего не возвращаем
      return; 
    }
    onLogin(values);
    resetForm();
  };

  if (loggedIn) return (<Navigate to='/' replace />)

  return (
    <>
      <Auth
        title='Рады видеть!'
        subtitle='Ещё не зарегистрированы?'
        route='/signup'
        link='Регистрация'
      >
        <Form
          onSubmit={handleSubmit}
          errorMessage={errorMessage || ''}
          text='Войти'
          disabled={!isValid}
        >
          <AuthWithForm
            id='email'
            label='E-mail'
            name='email'
            type='email'
            placeholder='E-mail'
            minLength='8'
            maxLength='30'
            required
            value={values.email || ''}
            error={errors.email || ''}
            onChange={handleChange}
          />
          <AuthWithForm
            id='password'
            label='Пароль'
            name='password'
            type='password'
            placeholder='Пароль'
            minLength='8'
            maxLength='30'
            required
            value={values.password || ''}
            error={errors.password || ''}
            onChange={handleChange}
          />
        </Form>
      </Auth>
    </>
  );
};

export default Login;

// Login — компонент страницы авторизации.
