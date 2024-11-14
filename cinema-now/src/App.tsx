import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';
import Bookingpage from './pages/Bookingpage';
import BookingConfirm from './pages/BookingConfirm';
import BookingHistory from './pages/BookingHistory';
import Navbar from './components/Navbar';
import UpcomingShows from './pages/UpcomingShows';
import Footer from './components/Footer';

function App() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Provider store={store}>
        <Router>
          <header>
            <Navbar />
          </header>
          <main className='flex-grow'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/movies' element={<MovieList />} />
              <Route path='/movies/:movieId' element={<MovieDetails />} />
              <Route path='/booking/:movieId' element={<Bookingpage />} />
              <Route
                path='/booking-confirmation'
                element={<BookingConfirm />}
              />
              <Route path='/booking-history' element={<BookingHistory />} />
              <Route path='/upcoming-shows' element={<UpcomingShows />} />
            </Routes>
          </main>
          <footer>
            <Footer />
          </footer>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
