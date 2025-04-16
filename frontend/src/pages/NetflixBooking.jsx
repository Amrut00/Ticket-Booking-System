// NetflixBooking.jsx
import React from 'react';
import NetflixForm from '../components/forms/NetflixForm';
import { useLocation } from 'react-router-dom';

const NetflixBooking = () => {

  const location = useLocation();

  return (
    <div className="booking-container">
      <h1>Netflix Subscription</h1>
      <NetflixForm />
    </div>
  );
};

export default NetflixBooking;