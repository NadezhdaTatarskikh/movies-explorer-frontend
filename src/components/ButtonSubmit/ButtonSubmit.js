import './ButtonSubmit.css';

const ButtonSubmit = ({ text, isDisabled }) => {
  return (
    <button className='button' type='submit' disabled={isDisabled} text={text}>
      {text}
    </button>
  );
};

export default ButtonSubmit;

// ButtonSubmit — компонент кнопки отправки запроса на авторизацию
