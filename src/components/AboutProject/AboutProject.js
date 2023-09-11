import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section id='about-project' className='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__container'>
        <div className='about-project__block'>
          <h3 className='about-project__name'>
            Дипломный проект включал 5 этапов
          </h3>
          <p className='about-project__description'>
            Составление плана, работу над бэкендом, вёрстку, добавление
            функциональности и финальные доработки.
          </p>
        </div>
        <div className='about-project__block'>
          <h3 className='about-project__name'>
            На выполнение диплома ушло 5 недель
          </h3>
          <p className='about-project__description'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
            соблюдать, чтобы успешно защититься.
          </p>
        </div>
      </div>
      <div className='about-project__status'>
        <p className='about-project__schedule'>1 неделя</p>
        <p className='about-project__schedule about-project__schedule_backend'>
          4 недели
        </p>
        <span className='about-project__text'>Back-end</span>
        <span className='about-project__text'>Front-end</span>
      </div>
    </section>
  );
};

export default AboutProject;

//AboutProject — компонент с описанием дипломного проекта.
