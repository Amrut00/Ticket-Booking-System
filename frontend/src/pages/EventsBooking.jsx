import React, { useEffect } from 'react';
import EventForm from '../components/forms/EventForm';
import { useLocation } from 'react-router-dom';

const EventsBooking = () => {

  const location = useLocation();

  return (
    <div className="booking-container">
      <h1>Event Ticket Booking</h1>
      <EventForm />
    </div>
  );
};

export default EventsBooking;