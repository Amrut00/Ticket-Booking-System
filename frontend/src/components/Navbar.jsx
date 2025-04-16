// Navbar.jsx
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">DashHub</Link>
      <ul className="nav-links">
        <li>
          <Link to="/railway" className={({ isActive }) => isActive ? "active" : ""}>
            Railway
          </Link>
        </li>
        <li>
          <Link to="/zomato" className={({ isActive }) => isActive ? "active" : ""}>
            Zomato
          </Link>
        </li>
        <li>
          <Link to="/netflix" className={({ isActive }) => isActive ? "active" : ""}>
            Netflix
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;