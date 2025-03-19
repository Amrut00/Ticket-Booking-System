import React, { useState } from 'react';
import './Form.css';

const EventForm = () => {
  const [formData, setFormData] = useState({
    eventType: 'concert',
    eventDate: '',
    guests: 1,
    ticketClass: 'general'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Event Booking Data:', formData);
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Event Type</label>
        <select
          value={formData.eventType}
          onChange={(e) => setFormData({...formData, eventType: e.target.value})}
          required
        >
          <option value="concert">Concert</option>
          <option value="conference">Conference</option>
          <option value="festival">Festival</option>
        </select>
      </div>

      <div className="form-group">
        <label>Event Date</label>
        <input
          type="date"
          value={formData.eventDate}
          onChange={(e) => setFormData({...formData, eventDate: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Number of Guests</label>
        <input
          type="number"
          min="1"
          max="10"
          value={formData.guests}
          onChange={(e) => setFormData({...formData, guests: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Ticket Class</label>
        <select
          value={formData.ticketClass}
          onChange={(e) => setFormData({...formData, ticketClass: e.target.value})}
          required
        >
          <option value="general">General Admission</option>
          <option value="vip">VIP</option>
          <option value="vvip">VVIP</option>
        </select>
      </div>

      <button type="submit">Book Event Tickets</button>
    </form>
  );
};

export default EventForm;