import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">TicketHub</Link>
      <ul className="nav-links">
        <li>
          <Link to="/movies" className={({ isActive }) => isActive ? "active" : ""}>
            Movies
          </Link>
        </li>
        <li>
          <Link to="/events" className={({ isActive }) => isActive ? "active" : ""}>
            Events
          </Link>
        </li>
        <li>
          <Link to="/sports" className={({ isActive }) => isActive ? "active" : ""}>
            Sports
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;