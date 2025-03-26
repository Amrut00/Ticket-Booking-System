import React, { useEffect } from 'react';
import SportsForm from '../components/forms/SportsForm';
import { useLocation } from 'react-router-dom';

const SportsBooking = () => {

  const location = useLocation();

  return (
    <div className="booking-container">
      <h1>Sports Ticket Booking</h1>
      <SportsForm />
    </div>
  );
};

export default SportsBooking;