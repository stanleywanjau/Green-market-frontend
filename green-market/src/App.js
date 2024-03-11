import './App.css';
import React, { useState, useEffect,  } from 'react';
import axios from 'axios';

import Home from './components/Home';
import { BrowserRouter as Router, Route,  } from 'react-router-dom'; // Import BrowserRouter as Router
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Footer from './components/Footer';
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
    <div className="App">
        <div className="header">
          
  
         
         <div className="actions">
         <p className="contact-btn">Contact Us</p>  <p className="sign-in-btn">Sign In / Register</p>
        </div>
      </div>
      <Search/>
      <Navbar/>

        
      <Router>
  {/* Wrap your routes with Router */}
  <Route path="/" exact render={() => <Home products={products} />} />
  <Route path="/cart" exact render={() => <Cart />} />
</Router>

    <Footer />
      </div>
  );
}


export default App;
