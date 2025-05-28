import './index.css'
import placeholder from './imgs/placeholder.png'
import { useEffect, useState } from 'react'

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
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/groceries")
      .then(res => res.json())
      .then(data => {
        console.log("Fetched from backend:", data);
        setGroceries(data);
      })
      .catch(err => console.error("Failed to load groceries:", err));
  }, []);

  function handleAddGroceries(item) {
    fetch("http://127.0.0.1:5000/groceries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Added to Flask backend:", data);

        const exists = groceries.some(
          grocery => grocery.grocery_name.toLowerCase() === item.grocery_name.toLowerCase()
        );

        if (!exists) {
          setGroceries(prev => [...prev, item]);
        } else {
          const updatedGroceries = groceries.map(grocery => {
            if (grocery.grocery_name.toLowerCase() === item.grocery_name.toLowerCase()) {
              return { ...grocery, quantity: grocery.quantity + 1 };
            }
            return grocery;
          });
          setGroceries(updatedGroceries);
        }
      })
      .catch(err => {
        console.error("Error adding to backend:", err);
      });
  }

  return (
    <div className='main-container'>
      <Navbar />
      <h1>Search Groceries:</h1>
      <SearchBar handleAddGrocery={handleAddGroceries} />
      <h1>Grocery List:</h1>
      <div className='grocery-container'>
        {groceries.map((item) => (
          <GroceryCard
            key={item.grocery_name}
            grocery_name={item.grocery_name}
            quantity={item.quantity}
          />
        ))}
      </div>
    </div>
  );
}
