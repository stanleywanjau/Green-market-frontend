import React from 'react'
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'bootstrap';


const Home = ({products}) => {
  const { addItem, removeItem, inCart } = useCart();
  const navigate = useNavigate();
 
  function navigateToProductDetails(productId) {
        navigate(`/product/${productId}`); 
      }
    

  const handleClick = (product) => {
    if (inCart(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };
  return (
    <div className='home-page'>
      
     
   
    <div className='container-card' id= "container-card" size={"15rem"}>
      {products.map((product) => (

    <div className="card" >
  <img src={product.image} className="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{product.name}</h5>
    <div class="card-text">Price : {product.price}</div>
    <div class="card-text">Location : {product.location}</div>
    <a href="#" class="btn btn-success" onClick={()=>navigateToProductDetails(product.id)}>View details</a>
    
    
  </div>
  
  
</div>))}
</div>
    </div>
    
    
    
   
  )
}

export default Home
