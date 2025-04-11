import React, { useState } from 'react';
import './Form.css';
import { LoadBalancerContext } from '../LiveUsers';
import { useContext } from 'react';
const SportsForm = () => {
  const lbContext = useContext(LoadBalancerContext);
  const sportLbUrl = lbContext.sports;
  
  const [formData, setFormData] = useState({
    sport: 'football',
    matchDate: '',
    quantity: 1,
    seating: 'standard'
  });

  console.log(sportLbUrl);
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Sports Booking Data:', formData);
    const response=await fetch(sportLbUrl);
     const handled= await response.json();
    console.log(handled);
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Sport Event</label>
        <select
          value={formData.sport}
          onChange={(e) => setFormData({...formData, sport: e.target.value})}
          required
        >
            <option value="cricket">Cricket Match</option>
            <option value="football">Football Match</option>
            <option value="basketball">Basketball Game</option>
            <option value="tennis">Hockey Tournament</option>
        </select>
      </div>

      <div className="form-group">
        <label>Match Date</label>
        <input
          type="datetime-local"
          value={formData.matchDate}
          onChange={(e) => setFormData({...formData, matchDate: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Ticket Quantity</label>
        <input
          type="number"
          min="1"
          max="10"
          value={formData.quantity}
          onChange={(e) => setFormData({...formData, quantity: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Seating Category</label>
        <select
          value={formData.seating}
          onChange={(e) => setFormData({...formData, seating: e.target.value})}
          required
        >
          <option value="standard">Standard</option>
          <option value="premium">Premium</option>
          <option value="vip-box">VIP Box</option>
        </select>
      </div>

      <button type="submit">Book Sports Tickets</button>
    </form>
  );
};

export default SportsForm;