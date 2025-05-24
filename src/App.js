import './index.css'

function Navbar() {
  return (
  <>
  <div className='navbar-container'> 

    <div className='logo'>Prep'd</div> {/* Placeholder for logo */}

    <ul className='navbar-list'>
      <li>Add Groceries</li>
      <li>Find Meals</li>
      <li>Saved Meals</li>
    </ul>

    <div className='account-actions'>
       <span>🔔</span>
       <span>👤</span>
    </div>
    
  </div>
  </>
  ) 
}

function SearchBar() {
  return (
    <div className='search-container'>
    
    <input placeholder='Add groceries...'></input>
    
    </div>
  )
}

export default function App() {
  return (
    <div className='main-container'>
    <Navbar></Navbar>
    <SearchBar></SearchBar>
    </div>
  );
}