import React from 'react';
import './AboutMe.css';
import myPhoto from '../../images/myPhoto.jpg';

const AboutMe = () => {
  return (
    <section className='about-me' id='student'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__container'>
        <div className='about-me__info'>
          <h3 className='about_me__name'>Надежда</h3>
          <p className='aboute-me__profession'>
            Фронтенд-разработчик/Бухгалтер, 41 год
          </p>
          <p className='about-me__description'>
            Я живу в Кирове, закончила факультет экономики РУИ. На данный момент
            работаю управляющей магазином женской одежды. В последнее время
            появился интерес к программированию, поэтому прошла на курсы
            Яндекс.Практикума 'Веб-разработчик'. В свободное время люблю слушать
            музыку, увлекаюсь бегом.
          </p>
          <a
            className='about-me__link link-hover'
            href='https://github.com/NadezhdaTatarskikh'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <img className='about-me__photo' src={myPhoto} alt='Моя фотограия' />
      </div>
    </section>
  );
};

export default AboutMe;

// AboutMe — компонент с информацией о студенте.
