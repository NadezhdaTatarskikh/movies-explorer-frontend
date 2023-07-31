import React from 'react';
import Auth from '../Auth/Auth';
import Form from '../Form/Form';
import AuthWithForm from '../AuthWithForm/AuthWithForm';
import { useFormValidation } from '../UseFormValidation/useFormValidation';

const Login = ({ onLogin, errorMessage }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  const handleSubmit = (evt) => {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    if (!values.password || !values.email) {
      return;
    }
    onLogin(values);
    resetForm();
  };
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
