import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MoviesBooking from './pages/MoviesBooking';
import EventsBooking from './pages/EventsBooking';
import SportsBooking from './pages/SportsBooking';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/movies" element={<MoviesBooking />} />
          <Route path="/events" element={<EventsBooking />} />
          <Route path="/sports" element={<SportsBooking />} />
          <Route path="/" element={<MoviesBooking />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;