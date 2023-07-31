import React from 'react';
import Auth from '../Auth/Auth';
import AuthWithForm from '../AuthWithForm/AuthWithForm';
import Form from '../Form/Form';
import { useFormValidation } from '../UseFormValidation/useFormValidation';

const Register = ({ onRegister, errorMessage }) => {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormValidation();

  const handleSubmit = (evt) => {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    if (!values.password || !values.email || !values.name) {
      return;
    }
    onRegister(values);
    resetForm();
  };
  return (
    <>
      <Auth
        title='Добро пожаловать!'
        subtitle='Уже зарегистрированы?'
        route='/signin'
        link='Войти'
      >
        <Form
          onSubmit={handleSubmit}
          errorMessage={errorMessage || ''}
          text='Зарегистрироваться'
          disabled={!isValid}
        >
          <AuthWithForm
            id='name'
            label='Имя'
            name='name'
            type='text'
            placeholder='Введите имя'
            minLength='2'
            maxLength='30'
            required
            value={values.name || ''}
            error={errors.name || ''}
            onChange={handleChange}
          />
          <AuthWithForm
            label='E-mail'
            name='email'
            type='email'
            placeholder='Введите E-mail'
            minLength='6'
            maxLength='30'
            required
            value={values.email || ''}
            error={errors.email || ''}
            onChange={handleChange}
          />
          <AuthWithForm
            label='Пароль'
            name='password'
            type='password'
            placeholder='Введите пароль'
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

export default Register;

// Register — компонент страницы регистрации.
