import React, { useState } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';







const Search = ({user}) => {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showMainDiv, setShowMainDiv] = useState(true);

  const handleProfileClick = () => {
    console.log("i have been clicked");
    setShowProfile(!showProfile); 
  };

  const handleContainerClick = () => {
    setShowProfile(false); 
    setShowMainDiv(true); 
  };

  const handleCartClick = () => {
    
    navigate('/cart'); // Navigate to the cart page
  };
  const {
    totalItems,
    totalUniqueItems

  } = useCart();
    
  const [searchTerm, setSearchTerm] = useState('');
    
    
    
    
    
  

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  // const handleProfileClick = () =>{
  //   console.log('Profile image clicked!');
  // }

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
      <button   size={20}  class="btn btn-outline-light">Search</button>
      
     
      <div>
      <div className='container relative px-10 py-10 '>

       
       <span>
       <AiOutlineShoppingCart size={30}  className='cursor-pointer' onClick={handleCartClick} >
        
       </AiOutlineShoppingCart>

       {totalUniqueItems}
       </span>
       
       </div>
       
       

      

        


      </div>

    </div> 
    


    </>
      
  );
}

export default Search;
