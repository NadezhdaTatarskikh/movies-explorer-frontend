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
            Статичный сайт
            <span className='portfolio__arrow'>&#8599;</span>
          </a>
        </li>
        <li className='portfolio__link-container'>
          <a
            className='portfolio__link'
            rel='noreferrer'
            href='https://github.com/NadezhdaTatarskikh/russian-travel/'
            target='_blank'
          >
            Адаптивный сайт
            <span className='portfolio__arrow'>&#8599;</span>
          </a>
        </li>
        <li className='portfolio__link-container'>
          <a
            className='portfolio__link'
            rel='noreferrer'
            href='https://domainname.students.tat.nomoredomains.work/'
            target='_blank'
          >
            Одностраничное приложение
            <span className='portfolio__arrow'>&#8599;</span>
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Portfolio;

// Portfolio — компонент со ссылками на другие проекты.
