import React, { useState, useContext } from 'react';
import './Form.css';
import { LoadBalancerContext } from '../LiveUsers';

// Import cuisine images (create these assets)
import indianCuisine from '../assets/indian-cuisine.png';
import italianCuisine from '../assets/italian-cuisine.png';
import mexicanCuisine from '../assets/mexican-cuisine.png';
import chineseCuisine from '../assets/chinese-cuisine.png';

const ZomatoForm = () => {
  const lbContext = useContext(LoadBalancerContext);
  const zomatoLbUrl = lbContext.zomato;
  const [formData, setFormData] = useState({
    restaurant: '',
    cuisine: 'indian',
    partySize: 2,
    reservationTime: '',
    specialRequests: ''
  });

  const popularRestaurants = [
    "Spice Garden (Indian)",
    "Pasta Palace (Italian)",
    "Taco Fiesta (Mexican)",
    "Dragon Wok (Chinese)",
    "Burger Barn (American)"
  ];

  const cuisines = [
    { value: 'indian', label: 'Indian', image: indianCuisine },
    { value: 'italian', label: 'Italian', image: italianCuisine },
    { value: 'mexican', label: 'Mexican', image: mexicanCuisine },
    { value: 'chinese', label: 'Chinese', image: chineseCuisine }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Zomato Booking Data:', formData);
    const response = await fetch(zomatoLbUrl);
    const handled = await response.json();
    console.log(handled);
  };

  return (
    <form className="zomato-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Make a Reservation</h2>
        <p>Book your table at the best restaurants in town</p>
      </div>

      <div className="form-section">
        <div className="form-group">
          <label>Restaurant Name</label>
          <div className="search-container">
            <input
              type="text"
              value={formData.restaurant}
              onChange={(e) => setFormData({...formData, restaurant: e.target.value})}
              placeholder="Search for restaurants..."
              list="restaurant-list"
              required
            />
            <datalist id="restaurant-list">
              {popularRestaurants.map((restaurant, index) => (
                <option key={index} value={restaurant} />
              ))}
            </datalist>
            <span className="search-icon">🔍</span>
          </div>
        </div>
      </div>

      <div className="form-section">
        <h3>Cuisine Preference</h3>
        <div className="cuisine-options">
          {cuisines.map((cuisine) => (
            <div
              key={cuisine.value}
              className={`cuisine-card ${formData.cuisine === cuisine.value ? 'selected' : ''}`}
              onClick={() => setFormData({...formData, cuisine: cuisine.value})}
            >
              <img src={cuisine.image} alt={cuisine.label} className="cuisine-image" />
              <div className="cuisine-label">{cuisine.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-section">
        <div className="form-row">
          <div className="form-group">
            <label>Party Size</label>
            <div className="party-size-selector">
              <button
                type="button"
                onClick={() => setFormData({...formData, partySize: Math.max(1, formData.partySize - 1)})}
              >
                -
              </button>
              <span>{formData.partySize}</span>
              <button
                type="button"
                onClick={() => setFormData({...formData, partySize: Math.min(10, formData.partySize + 1)})}
              >
                +
              </button>
            </div>
          </div>

          <div className="form-group">
            <label>Reservation Time</label>
            <div className="datetime-picker">
              <input
                type="date"
                value={formData.reservationTime.split('T')[0] || ''}
                onChange={(e) => {
                  const timePart = formData.reservationTime.split('T')[1] || '';
                  setFormData({...formData, reservationTime: `${e.target.value}T${timePart}`});
                }}
                required
              />
              <input
                type="time"
                value={formData.reservationTime.split('T')[1] || ''}
                onChange={(e) => {
                  const datePart = formData.reservationTime.split('T')[0] || '';
                  setFormData({...formData, reservationTime: `${datePart}T${e.target.value}`});
                }}
                required
              />
            </div>
          </div>
        </div>
      </div>

      <div className="form-section">
        <div className="form-group">
          <label>Special Requests</label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => setFormData({...formData, specialRequests: e.target.value})}
            placeholder="Any dietary restrictions or special arrangements?"
            rows="3"
          />
        </div>
      </div>

      <button type="submit" className="reserve-button">
        Reserve Table
      </button>
    </form>
  );
};

export default ZomatoForm;