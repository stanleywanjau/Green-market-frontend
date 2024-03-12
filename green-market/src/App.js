import './App.css';
import React, { useState, useEffect,  } from 'react';
import axios from 'axios';
import { CartProvider } from 'react-use-cart';
import Home from './components/Home';
import {  Route,Routes ,useNavigate ,Link } from 'react-router-dom'; // Import BrowserRouter as Router
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Footer from './components/Footer';
import ProductDetails from './components/productdetails';
import UserProfile from './components/profile';
import Farm from './Authetification/Farmerdetails';
import Login from './Authetification/signin';
import SignUp from './Authetification/signup';
import ForgotPassword from './Authetification/ForgotPassword';
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
    <CartProvider>
    <div className="App">
        <div className="header">
          
  
         
         <div className="actions">
         <h7 className="contact-btn">Contact Us</h7>  <h7 className="sign-in-btn">Sign In / Register</h7>
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
  <Route path='/signup' element={<SignUp /> }/>
  <Route path='/login' element={<Login /> }/>
  <Route path='/forgot-password' element={<ForgotPassword/> }/>
  <Route path='/farmdetails' element={<Farm/> }/>
</Routes>

    <Footer />
      </div>
      </CartProvider>
  );
}


export default App;
