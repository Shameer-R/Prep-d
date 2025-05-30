import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import AddGroceriesPage from './pages/AddGroceriesPage';
import FindMealsPage from './pages/FindMealsPage';
import SavedMealsPage from './pages/SavedMealsPage';
import './index.css';

export default function App() {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/groceries")
      .then(res => res.json())
      .then(data => setGroceries(data))
      .catch(err => console.error("Failed to load groceries:", err));
  }, []);

  function handleAddGroceries(item) {
    fetch("http://127.0.0.1:5000/groceries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item)
    })
      .then(res => res.json())
      .then(() => {
        const exists = groceries.some(
          grocery => grocery.grocery_name.toLowerCase() === item.grocery_name.toLowerCase()
        );
        if (!exists) {
          setGroceries(prev => [...prev, item]);
        }
      })
      .catch(err => console.error("Error adding to backend:", err));
  }

  return (
    <Router>
      <div className='main-container'>
        <Navbar />
        <Routes>
          <Route path='/' element={<AddGroceriesPage groceries={groceries} handleAddGroceries={handleAddGroceries} />} />
          <Route path='/find-meals' element={<FindMealsPage />} />
          <Route path='/saved-meals' element={<SavedMealsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
