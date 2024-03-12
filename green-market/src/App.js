import './App.css';
import React, { useState, useEffect,  } from 'react';
import axios from 'axios';
import { CartProvider } from 'react-use-cart';
import Home from './components/Home';
import {  Route,Routes  } from 'react-router-dom'; // Import BrowserRouter as Router
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Footer from './components/Footer';
import ProductDetails from './components/productdetails';
function App() {

  const [products, setProducts] = useState([]);
  // const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/productslist'); 
        //  console.log(response)
         setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  // console.log(products)

  

  return (
    <CartProvider>
    <div className="App">
        <div className="header">
          
  
         
         <div className="actions">
         <h7 className="contact-btn">Contact Us</h7>  <h7 className="sign-in-btn">Sign In / Register</h7>
        </div>
      </div>
      <Search/>
      <Navbar/>

        
      <Routes>
  {/* Wrap your routes with Router */}
  <Route path="/" element={<Home products={products} />} />
  <Route path="/cart" element={ <Cart />} />
  <Route path='/product/:productId' element={<ProductDetails/>}/>
</Routes>

    <Footer />
      </div>
      </CartProvider>
  );
}


export default App;
