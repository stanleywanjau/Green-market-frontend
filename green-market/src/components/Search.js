import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCart } from 'react-use-cart';



const Search = () => {
  const {
    totalItems,
    totalUniqueItems

  } = useCart();
    
    
    
    
    
    
  
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <>
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
      
     
      <div>
      <div className='container relative px-10 py-10 '>

       
       <span>
       <AiOutlineShoppingCart size={40}  className='cursor-pointer' ></AiOutlineShoppingCart>

       {totalUniqueItems}
       </span>
       </div>
       

      

        


      </div>

    </div>
    


    </>
      
  );
}

export default Search;
