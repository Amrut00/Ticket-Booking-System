// ZomatoBooking.jsx
import React from 'react';
import ZomatoForm from '../components/forms/ZomatoForm';
import { useLocation } from 'react-router-dom';

const ZomatoBooking = () => {

  const location = useLocation();

  return (
    <div className="booking-container">
      <h1>Zomato Table Reservation</h1>
      <ZomatoForm />
    </div>
  );
};

export default ZomatoBooking;