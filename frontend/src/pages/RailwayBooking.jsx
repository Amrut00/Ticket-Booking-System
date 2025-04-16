// RailwayBooking.jsx
import React from 'react';
import RailwayForm from '../components/forms/RailwayForm';
import { useLocation } from 'react-router-dom';

const RailwayBooking = () => {

  const location = useLocation();

  return (
    <div className="booking-container">
      <h1>Railway Ticket Booking</h1>
      <RailwayForm />
    </div>
  );
};

export default RailwayBooking;