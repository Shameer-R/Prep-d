import './index.css'
import placeholder from './imgs/placeholder.png'
import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

function Navbar() {
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

function SearchBar(props) {
  const [searchVal, setSearchVal] = useState('');

  function handleSubmit() {
    if (searchVal.trim() !== '') {
      props.handleAddGrocery({ grocery_name: searchVal });
    }
  }

  return (
    <div className='search-container'>
      <input
        placeholder='Add groceries...'
        onChange={(e) => setSearchVal(e.target.value)}
      />
      <button onClick={handleSubmit}>+</button>
    </div>
  );
}

function GroceryCard(prop) {
  return (
    <div className='grocery-card'>
      <img alt={prop.grocery_name} src={placeholder} />
      <p>{prop.grocery_name}</p>
    </div>
  );
}

function AddGroceriesPage({ groceries, handleAddGroceries }) {
  return (
    <>
      <h1>Search Groceries:</h1>
      <SearchBar handleAddGrocery={handleAddGroceries} />
      <h1>Grocery List:</h1>
      <div className='grocery-container'>
        {groceries.map((item) => (
          <GroceryCard key={item.grocery_name} grocery_name={item.grocery_name} />
        ))}
      </div>
    </>
  );
}

function FindMealsPage() {
  return <h1>Find Meals Page (coming soon)</h1>;
}

function SavedMealsPage() {
  return <h1>Saved Meals Page (coming soon)</h1>;
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
        }
      })
      .catch(err => {
        console.error("Error adding to backend:", err);
      });
  }

  return (
    <Router>
      <div className='main-container'>
        <Navbar />
        <Routes>
          <Route path='/' element={<AddGroceriesPage groceries={groceries} handleAddGroceries={handleAddGroceries} />} />
          <Route path="/find-meals" element={<FindMealsPage />} />
          <Route path="/saved-meals" element={<SavedMealsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
