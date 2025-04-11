import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MoviesBooking from './pages/MoviesBooking';
import EventsBooking from './pages/EventsBooking';
import SportsBooking from './pages/SportsBooking';
import LiveUsers from './components/LiveUsers';
import { LoadBalancerContext } from './components/LiveUsers';
import { useState } from 'react';
import './App.css';

function App() {

  const [lbUrls, setLbUrls] = useState({
    movie: 'http://load-balancer-amrut-1189107151.ap-south-1.elb.amazonaws.com',
    event_load: 'http://load-balancer-amrut-1189107151.ap-south-1.elb.amazonaws.com',
    sport: 'http://load-balancer-amrut-1189107151.ap-south-1.elb.amazonaws.com'
  });

  return (
    <LoadBalancerContext.Provider value={lbUrls}>
    <Router>
      <div className="App">
        <Navbar />
        <LiveUsers  lbUrls={lbUrls} setLbUrls={setLbUrls} />
        <Routes>
          <Route path="/movies" element={<MoviesBooking />} />
          <Route path="/events" element={<EventsBooking />} />
          <Route path="/sports" element={<SportsBooking />} />
          <Route path="/" element={<MoviesBooking />} />
        </Routes>
      </div>
    </Router>
    </LoadBalancerContext.Provider >
  );
}

export default App;
