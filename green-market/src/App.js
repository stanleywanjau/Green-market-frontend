import './App.css';
import React, { useState, useEffect,  } from 'react';
import axios from 'axios';

import Home from './components/Home';
import {  Route,Routes ,useNavigate } from 'react-router-dom'; // Import BrowserRouter as Router
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Footer from './components/Footer';
import ProductDetails from './components/productdetails';
import UserProfile from './components/profile';
function App() {

  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
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

  useEffect(() => {
    const checkSession = () => {
      fetch(`/checksession`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
      })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to check session');
        }
      })
      .then(userData => {
        setUser(userData);
        navigate(window.location.pathname); 
      })
      .catch(error => {
        console.error('Error checking session:', error);
      });
    };

    checkSession();
  }, [navigate]);

  

  return (
    <div className="App">
        <div className="header">
          
  
         
         <div className="actions">
         <p className="contact-btn">Contact Us</p>  <p className="sign-in-btn">Sign In / Register</p>
        </div>
      </div>
      <Search/>
      <Navbar/>
      {/* <UserProfile/> */}

        
      <Routes>
  {/* Wrap your routes with Router */}
  <Route path="/" element={<Home products={products} />} />
  <Route path="/cart" element={ <Cart />} />
  <Route path='/product/:productId' element={<ProductDetails/>}/>
</Routes>

    <Footer />
      </div>
  );
}


export default App;
