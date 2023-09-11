import './AuthWithForm.css';

const AuthWithForm = ({ label, error, name, type, ...rest }) => {
  return (
    <div className='auth-form'>
      <label className='auth-form__label'>{label}</label>
      <input className='auth-form__input' name={name} type={type} {...rest} />
      <span className='auth-form__error'>{error}</span>
    </div>
  );
};

export default AuthWithForm;

// компонент инпут для формы авторизации пользователей
