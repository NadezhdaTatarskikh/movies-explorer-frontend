import React from 'react';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__links'>
        <li className='portfolio__link-container'>
          <a
            className='portfolio__link'
            rel='noreferrer'
            href='https://github.com/NadezhdaTatarskikh/how-to-learn/'
            target='_blank'
          >
            <p className='portfolio__link-title'>Статичный сайт</p>
            <div className='portfolio__link-arrow'></div>
          </a>
        </li>
        <li className='portfolio__link-container'>
          <a
            className='portfolio__link'
            rel='noreferrer'
            href='https://github.com/NadezhdaTatarskikh/russian-travel/'
            target='_blank'
          >
            <p className='portfolio__link-title'>Адаптивный сайт</p>
            <div className='portfolio__link-arrow'></div>
          </a>
        </li>
        <li className='portfolio__link-container'>
          <a
            className='portfolio__link'
            rel='noreferrer'
            href='https://domainname.students.tat.nomoredomains.work/'
            target='_blank'
          >
            <p className='portfolio__link-title'>Одностраничное приложение</p>
            <div className='portfolio__link-arrow'></div>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;

// Portfolio — компонент со ссылками на другие проекты.
