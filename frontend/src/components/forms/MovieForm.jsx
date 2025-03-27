import React, { useState } from 'react';
import './Form.css';

const MovieForm = () => {
  const [formData, setFormData] = useState({
    movie: '',
    showTime: '',
    tickets: 1,
    ticketType: 'standard'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Movie Booking Data:', formData);
    const response=await fetch("http://load-balancer-1-1967566059.ap-south-1.elb.amazonaws.com/");
     const handled= await response.json();
    console.log(handled);
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Select Movie</label>
        <select
          value={formData.movie}
          onChange={(e) => setFormData({...formData, movie: e.target.value})}
          required
        >
          <option value="">Choose a movie</option>
          <option value="intersteller">Intersteller</option>
          <option value="avengers">Avengers: Endgame</option>
          <option value="inception">Inception</option>
          <option value="joker">Joker</option>
        </select>
      </div>

      <div className="form-group">
        <label>Show Time</label>
        <input
          type="datetime-local"
          value={formData.showTime}
          onChange={(e) => setFormData({...formData, showTime: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Number of Tickets</label>
        <input
          type="number"
          min="1"
          max="10"
          value={formData.tickets}
          onChange={(e) => setFormData({...formData, tickets: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Ticket Type</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="ticketType"
              value="standard"
              checked={formData.ticketType === 'standard'}
              onChange={(e) => setFormData({...formData, ticketType: e.target.value})}
            />
            Standard
          </label>
          <label>
            <input
              type="radio"
              name="ticketType"
              value="premium"
              checked={formData.ticketType === 'premium'}
              onChange={(e) => setFormData({...formData, ticketType: e.target.value})}
            />
            Premium
          </label>
        </div>
      </div>

      <button type="submit">Book Movie Tickets</button>
    </form>
  );
};

export default MovieForm;