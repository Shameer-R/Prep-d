import './index.css'
import placeholder from './imgs/placeholder.png'

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

    <button>+</button>
    
    </div>
  )
}

function GroceryCard(prop) {
  return (
    <>
    <div className='grocery-card'>
      <img alt={prop.grocery_name} src={placeholder}></img>
      <p>{prop.grocery_name} {prop.quantity}x</p>
    </div>
    </>
  )
}

export default function App() {
  return (
    <div className='main-container'>
      <Navbar></Navbar>
      <SearchBar></SearchBar>
      <h1>Grocery List:</h1>
      <div className='grocery-container'>
       <GroceryCard grocery_name="Apple" quantity="2"></GroceryCard>
       <GroceryCard grocery_name="Banana" quantity="4"></GroceryCard>
      </div>
    </div>
  );
}