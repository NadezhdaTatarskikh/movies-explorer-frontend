import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <section className='footer'>
      <h2 className='footer__text'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className='footer__container'>
        <span className='footer__copyright'>&copy; {currentYear}</span>
        <div className='footer__content-socials'>
          <a
            className='link footer__link'
            href='https://practicum.yandex.ru'
            target='_blank'
            rel='noreferrer'
          >
            Яндекс.Практикум
          </a>
          <a
            className='link link footer__link'
            href='https://github.com/NadezhdaTatarskikh'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
      </div>
    </section>
  );
};

export default Footer;

// Footer — презентационный компонент, который отрисовывает подвал.
