import './index.css'

function Navbar() {
  return (
  <>
  <div className='navbar-container'> 
    <li>Prep'd</li> {/* Placeholder for logo */}
    <ul className='navbar-list'>
      <li>Add Groceries</li>
      <li>Find Meals</li>
      <li>Saved Meals</li>
    </ul>
  </div>
  </>
  ) 
}

export default function App() {
  return (
    <>
    <Navbar></Navbar>
    </>
  );
}