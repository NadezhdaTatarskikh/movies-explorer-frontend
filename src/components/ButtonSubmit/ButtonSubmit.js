import './ButtonSubmit.css';

const ButtonSubmit = ({ text, disabled, ...rest }) => {
  const buttonClassName =  `${disabled ? 'button button_disabled' : 'button button:hover'}`
  return (
    <button className={buttonClassName} type='submit' text={text} {...rest}>
      {text}
    </button>
  );
};

export default ButtonSubmit;

// ButtonSubmit — компонент кнопки отправки запроса на авторизацию
