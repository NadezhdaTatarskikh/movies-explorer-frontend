import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({ movies }) => {
  
  return (
    <>
       <ul className='cards__list'> 
        {movies && movies.map((movie) => (
        <MoviesCard 
            key={movie.id || movie.movieId} 
            movie={movie} 
        />
        ))}
      </ul>
    </>
  );
};

export default MoviesCardList;

// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
