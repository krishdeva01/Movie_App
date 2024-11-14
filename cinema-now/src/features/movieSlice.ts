import { createSlice } from '@reduxjs/toolkit';

export interface Movie {
  id: number;
  name: string;
  genre: string;
  duration: string;
  description: string;
  poster: string;
  year: string;
}

interface MovieListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Movie[];
}
interface MovieState {
  movieList: MovieListResponse | null;
  movie: Movie | null;
  currentPage: number;
}

const initialState: MovieState = {
  movieList: null,
  movie: null,
  currentPage: 1,
};

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    getMovies(name) {
      return name;
    },
    setMovies(state, action) {
      state.movieList = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
  },
});

export const { getMovies, setMovies, setCurrentPage } = movieSlice.actions;
export default movieSlice.reducer;
