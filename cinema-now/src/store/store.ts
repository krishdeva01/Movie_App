import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import MovieReducer from '../features/movieSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    movie: MovieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
