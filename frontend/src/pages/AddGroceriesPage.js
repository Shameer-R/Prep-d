import SearchBar from '../components/SearchBar';
import GroceryCard from '../components/GroceryCard';
import '../index.css';

export default function AddGroceriesPage({ groceries, handleAddGroceries }) {
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
