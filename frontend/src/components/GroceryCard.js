import placeholder from '../imgs/placeholder.png';
import '../index.css';

export default function GroceryCard({ grocery_name }) {
  return (
    <div className='grocery-card'>
      <img alt={grocery_name} src={placeholder} />
      <p>{grocery_name}</p>
    </div>
  );
}
