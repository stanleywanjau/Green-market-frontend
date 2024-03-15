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
      <div id="carouselExampleFade" class="carousel slide carousel-slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://media.istockphoto.com/id/1324829721/photo/young-man-working-in-vegetable-garden.webp?s=2048x2048&w=is&k=20&c=tgG5zlcmkeH-llOz92P7CeIclzZxOJWdw9kFiw8s644=" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>GreenMarket</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>

    </div>
    <div class="carousel-item">
      <img src="https://media.istockphoto.com/id/1398811723/photo/controlling-the-plants.jpg?s=1024x1024&w=is&k=20&c=egX-9VN4QAb9NP48lt6lwjr8FY5sUs0T-74Po6GmhAY=" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h5>GreenMarket</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>

    </div>
    <div class="carousel-item">
      <img src="https://images.unsplash.com/photo-1686145546043-a847a2ff5741?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" class="d-block w-100" alt="..."  />
      <div class="carousel-caption d-none d-md-block">
        <h5>Second slide label</h5>
        <p>Some representative placeholder content for the second slide.</p>
      </div>

    </div>
  </div>
  <button class="carousel-control-prev" color='black' type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span class="carousel-control-prev-icon"color='black'  ></span>
    <span class="visually-hidden" color='black' >Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    
   
    <div className='container-card' id= "container-card" size={"15rem"}>
      {products.map((product) => (

    <div className="card" >
  <img src={product.image} className="card-img-top" alt="..."/>
  <div class="card-body">
    <h5 class="card-title">{product.name}</h5>
    <p class="card-text">Price :{product.price}</p>
    <a href="#" class="btn btn-success" onClick={()=>navigateToProductDetails(product.id)}>View details</a>
    
    
  </div>
  
  
</div>))}
</div>
    </div>
    
    
    
   
  )
}

export default Home