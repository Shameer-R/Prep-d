import './index.css'
import placeholder from './imgs/placeholder.png'
import { use, useState } from 'react'
import { createElement } from 'react';

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

function SearchBar(props) {

  const [searchVal, setSearchVal] = useState(null);

  function handleSubmit() {
    if (searchVal.trim() !== '') {
      props.handleAddGrocery({grocery_name: searchVal, quantity: 1})
    }
  }

  return (


    <div className='search-container'>
    
    <input placeholder='Add groceries...' onChange={(e) => setSearchVal(e.target.value)}></input>

    <button onClick={handleSubmit}>+</button>
    
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

  const[groceries, setGroceries] = useState([]);

  function handleAddGroceries(item) {
    setGroceries([...groceries, item]);
  }

  return (
    <div className='main-container'>
      <Navbar></Navbar>
      <SearchBar handleAddGrocery={handleAddGroceries}></SearchBar>
      <h1>Grocery List:</h1>
      <div className='grocery-container'>
        {
          groceries.map(function(item, index) {
            return (
              <GroceryCard
                key={item.grocery_name}
                grocery_name={item.grocery_name}
                quantity={item.quantity}
              />
            );
          })
        }
      </div>
    </div>
  );
}