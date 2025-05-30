import { useState } from 'react';
import '../index.css';

export default function SearchBar(props) {
  const [searchVal, setSearchVal] = useState('');

  function handleSubmit() {
    if (searchVal.trim() !== '') {
      props.handleAddGrocery({ grocery_name: searchVal });
    }
  }

  return (
    <div className='search-container'>
      <input placeholder='Add groceries...' onChange={(e) => setSearchVal(e.target.value)} />
      <button onClick={handleSubmit}>+</button>
    </div>
  );
}
