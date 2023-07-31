import { checkResponse, MOVIE_URL } from './Constants';

class MoviesApi {
  constructor(movieUrl) {
    this._movieUrl = movieUrl;
  }
  getMovies() {
    return fetch(this._movieUrl).then((res) => checkResponse(res));
  }
}

const moviesApi = new MoviesApi(MOVIE_URL);

export default moviesApi;
