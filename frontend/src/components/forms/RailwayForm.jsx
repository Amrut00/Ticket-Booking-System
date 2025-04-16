import React, { useState, useContext } from 'react';
import './Form.css';
import { LoadBalancerContext } from '../LiveUsers';

// Import your images or use relative paths
import sleeperImg from '../assets/sleeper.png';
import ac3Img from '../assets/3ac.png';
import ac2Img from '../assets/2ac.png';
import ac1Img from '../assets/1ac.png';

const RailwayForm = () => {
  const lbContext = useContext(LoadBalancerContext);
  const railwayLbUrl = lbContext.railway;
  const [formData, setFormData] = useState({
    route: '',
    journeyDate: '',
    class: 'sleeper',
    passengers: 1
  });

  const trainRoutes = [
    { name: 'Pune - Lonavala Express', value: 'PUNE-LON' },
    { name: 'Mumbai Central - Surat Intercity', value: 'MBCT-ST' },
    { name: 'Delhi - Jaipur Superfast', value: 'DLHI-JPR' },
    { name: 'Chennai - Bangalore Shatabdi', value: 'MAS-SBC' }
  ];

  const classOptions = [
    { value: 'sleeper', label: 'Sleeper Class', img: sleeperImg },
    { value: '3ac', label: 'AC 3 Tier', img: ac3Img },
    { value: '2ac', label: 'AC 2 Tier', img: ac2Img },
    { value: '1ac', label: 'First AC', img: ac1Img }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Railway Booking Data:', formData);
    const response = await fetch(railwayLbUrl);
    const handled = await response.json();
    console.log(handled);
  };

  return (
    <form className="booking-form railway-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Select Route</label>
        <div className="route-select-container">
          <select
            value={formData.route}
            onChange={(e) => setFormData({...formData, route: e.target.value})}
            required
          >
            <option value="">Choose a route</option>
            {trainRoutes.map((route) => (
              <option key={route.value} value={route.value}>
                {route.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Journey Date</label>
        <input
          type="date"
          value={formData.journeyDate}
          onChange={(e) => setFormData({...formData, journeyDate: e.target.value})}
          required
        />
      </div>

      <div className="form-group">
        <label>Travel Class</label>
        <div className="class-options">
          {classOptions.map((option) => (
            <div 
              key={option.value}
              className={`class-option ${formData.class === option.value ? 'selected' : ''}`}
              onClick={() => setFormData({...formData, class: option.value})}
            >
              <img src={option.img} alt={option.label} className="class-image" />
              <span className="class-label">{option.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Number of Passengers</label>
        <div className="passenger-select">
          <input
            type="number"
            min="1"
            max="6"
            value={formData.passengers}
            onChange={(e) => setFormData({...formData, passengers: e.target.value})}
            required
          />
          <span className="passenger-icon">👥</span>
        </div>
      </div>

      <button type="submit" className="cta-button">
        Book Now
      </button>
    </form>
  );
};

export default RailwayForm;