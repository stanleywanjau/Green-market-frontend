import React, { useState } from 'react';


const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <div className="search-container">
      <a className='green'>Green</a><p className='market'>Market</p>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
        
      />
      <button type="button" class="btn btn-success">Search</button>

    </div>
  );
}

export default Search;