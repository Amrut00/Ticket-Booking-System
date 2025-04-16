import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RailwayBooking from './pages/RailwayBooking';
import ZomatoBooking from './pages/ZomatoBooking';
import NetflixBooking from './pages/NetflixBooking';
import LiveUsers from './components/LiveUsers';
import { LoadBalancerContext } from './components/LiveUsers';
import { useState } from 'react';
import './App.css';

function App() {

  const [lbUrls, setLbUrls] = useState({
    railway: 'http://load-balancer-amrut-1189107151.ap-south-1.elb.amazonaws.com',
    zomato: 'http://load-balancer-amrut-1189107151.ap-south-1.elb.amazonaws.com',
    netflix: 'http://load-balancer-amrut-1189107151.ap-south-1.elb.amazonaws.com'
  });

  return (
    <LoadBalancerContext.Provider value={lbUrls}>
      <Router>
        <div className="App">
          <Navbar />
          <LiveUsers lbUrls={lbUrls} setLbUrls={setLbUrls} />
          <Routes>
            <Route path="/railway" element={<RailwayBooking />} />
            <Route path="/zomato" element={<ZomatoBooking />} />
            <Route path="/netflix" element={<NetflixBooking />} />
            <Route path="/" element={<RailwayBooking />} />
          </Routes>
        </div>
      </Router>
    </LoadBalancerContext.Provider>
  );
}

export default App;
