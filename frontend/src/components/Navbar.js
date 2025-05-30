import { Link } from "react-router-dom";
import '../index.css';

export default function Navbar() {
  return (
    <div className='navbar-container'>
      <div className='logo'>Prep'd</div>
      <ul className='navbar-list'>
        <li><Link to="/">Add Groceries</Link></li>
        <li><Link to="/find-meals">Find Meals</Link></li>
        <li><Link to="/saved-meals">Saved Meals</Link></li>
      </ul>
      <div className='account-actions'>
        <span>🔔</span>
        <span>👤</span>
      </div>
    </div>
  );
}
