import React, { useEffect }  from 'react';
import MovieForm from '../components/forms/MovieForm';
import { useLocation } from 'react-router-dom';

const MoviesBooking = () => {

  const location = useLocation();

  return (
    <div className="booking-container">
      <h1>Movie Ticket Booking</h1>
      <MovieForm />
    </div>
  );
};

export default MoviesBooking;