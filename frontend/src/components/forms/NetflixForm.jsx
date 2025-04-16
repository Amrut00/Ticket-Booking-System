import React, { useState, useContext } from 'react';
import './Form.css';
import { LoadBalancerContext } from '../LiveUsers';

// Import plan images (create these assets)
import basicPlanImg from '../assets/netflix-basic.png';
import standardPlanImg from '../assets/netflix-standard.png';
import premiumPlanImg from '../assets/netflix-premium.png';
import creditCardIcon from '../assets/credit-card.png';
import debitCardIcon from '../assets/debit-card.png';
import paypalIcon from '../assets/paypal.png';

const NetflixForm = () => {
  const lbContext = useContext(LoadBalancerContext);
  const netflixLbUrl = lbContext.netflix;
  const [formData, setFormData] = useState({
    plan: 'basic',
    paymentMethod: 'credit',
    email: '',
    password: ''
  });

  const plans = [
    {
      id: 'basic',
      name: 'Basic Plan',
      price: '$8.99',
      resolution: '480p',
      devices: '1 device',
      img: basicPlanImg
    },
    {
      id: 'standard',
      name: 'Standard Plan',
      price: '$13.99',
      resolution: '1080p',
      devices: '2 devices',
      img: standardPlanImg
    },
    {
      id: 'premium',
      name: 'Premium Plan',
      price: '$17.99',
      resolution: '4K+HDR',
      devices: '4 devices',
      img: premiumPlanImg
    }
  ];

  const paymentMethods = [
    { id: 'credit', name: 'Credit Card', icon: creditCardIcon },
    { id: 'debit', name: 'Debit Card', icon: debitCardIcon },
    { id: 'paypal', name: 'PayPal', icon: paypalIcon }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Netflix Subscription Data:', formData);
    const response = await fetch(netflixLbUrl);
    const handled = await response.json();
    console.log(handled);
  };

  return (
    <form className="netflix-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Start Your Membership</h2>
        <p>Choose your plan and payment method</p>
      </div>

      <div className="form-section">
        <h3>Select Your Plan</h3>
        <div className="plan-options">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan-card ${formData.plan === plan.id ? 'selected' : ''}`}
              onClick={() => setFormData({...formData, plan: plan.id})}
            >
              <img src={plan.img} alt={plan.name} className="plan-image" />
              <div className="plan-details">
                <h4>{plan.name}</h4>
                <p className="plan-price">{plan.price}/month</p>
                <p>{plan.resolution} • {plan.devices}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h3>Payment Method</h3>
        <div className="payment-options">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className={`payment-method ${formData.paymentMethod === method.id ? 'selected' : ''}`}
              onClick={() => setFormData({...formData, paymentMethod: method.id})}
            >
              <img src={method.icon} alt={method.name} className="payment-icon" />
              <span>{method.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="form-section">
        <h3>Account Information</h3>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            placeholder="Create a password"
            required
          />
        </div>
      </div>

      <button type="submit" className="subscribe-button">
        Start Membership
      </button>
    </form>
  );
};

export default NetflixForm;