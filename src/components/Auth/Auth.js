import { Link } from 'react-router-dom';
import Logo from '../../images/logo.svg';
import './Auth.css';

const Auth = ({ title, children, subtitle, route, link }) => {
  return (
    <section className='auth'>
      <Link to='/'>
        <img className='auth__logo' src={Logo} alt='Логотип'></img>
      </Link>
      <h2 className='auth__title'>{title}</h2>
      {children}
      <p className='auth__subtitle'>
        {subtitle}
        <Link to={route} className='auth__link'>
          {link}
        </Link>
      </p>
    </section>
  );
};

export default Auth;

// Auth — компонент для страниц с авторизацией и регистрацией пользователя
