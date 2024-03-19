import './App.css';
import React, { useState, useEffect, } from 'react';
import { ToastContainer} from 'react-toastify';
import axios from 'axios';
import { CartProvider } from 'react-use-cart';
import Home from './components/Home';
import {  Route,Routes ,useNavigate ,Link ,useLocation,useParams} from 'react-router-dom'; // Import BrowserRouter as Router
import Cart from './components/Cart';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/Navbar';
import Search from './components/Search';
import Footer from './components/Footer';
import ProductDetails from './components/productdetails';
import Profile from './components/profile';
import Farm from './Authetification/Farmerdetails';
import Login from './Authetification/signin';
import SignUp from './Authetification/signup';
import ForgotPassword from './Authetification/ForgotPassword';
import Farmerproduct from './FarmerDashboard/FarmerProduct';
import ReviewComponent from './components/ReviewComponent'
import AddProductForm from './FarmerDashboard/Addfarmerproducts';
import UpdateProductForm from './FarmerDashboard/UpdateProduct';
import FarmerOrders from './FarmerDashboard/FarmerOrder';
import ChatComponent from "./components/ChatComponent.js";
import OrderHistory from './components/Order.js';
import AboutPage from './components/AboutPage.js';



function App() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://green-market-backend-2es1.onrender.com/productslist');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
// console.log(user.username)
  useEffect(() => {
    const checkSession = () => {
      fetch(`https://green-market-backend-2es1.onrender.com/checksession`, {
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

  function handleLogout() {
    localStorage.removeItem('jwt');
    // setUser(null);
    navigate('/');
    window.location.reload();
  }

  const ChatRouteComponent = () => {
    const { receiver, product_id } = useParams();

    return <ChatComponent receiver={receiver} product_id={product_id} />;
  };

  // Conditional rendering for navbar and other components based on the current route
  const shouldRenderNavbar = location.pathname !== '/signup' && location.pathname !== '/login' && location.pathname !== '/forgot-password';

  return (
    <CartProvider>
      {loading ? ( // Render loading message if loading is true
        <div>Loading...</div>
      ) : (
        <>
       <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        
        />
      <div className="App">
        <div className="header">
          <div className="actions">
            {user ? (
              <>
                <button
                  className="btn btn-outline-secondary ms-2 nav-signup-btn"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                {shouldRenderNavbar && (
                  <>
                    <Link to="/login" className="btn btn-outline-success nav-login-btn">
                      Sign in
                    </Link>
                    <Link to="/signup" className="btn btn-outline-secondary ms-2 nav-signup-btn">
                      Sign Up
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
        
        {shouldRenderNavbar && <Search user={user}/>}
        {shouldRenderNavbar && <NavBar user={user} />}

        <Routes>
          <Route path="/" element={<Home products={products} />} />
          {user && user.role === 'farmer' ? (
            <>
              <Route path='/addproduct' element={<AddProductForm />} />
              <Route path='/farmerorder' element={<FarmerOrders />} />
              <Route path='/farmerproduct' element={<Farmerproduct />} />
              <Route path='/Updateproduct/:productId' element={<UpdateProductForm />} />
              
            </>
          ) : null}
          <Route path='/profile' element={<Profile user={user} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/product/:productId' element={<ProductDetails products={products} />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path="/reviews/:productId" element={<ReviewComponent />} />
          <Route path='/farmdetails' element={<Farm />} />
          <Route path='/About' element={<AboutPage />} />
          
          {user && (user.role === 'customer' || user.role === 'farmer') && (
            <Route path='/order' element={<OrderHistory />} />
          )}
          
          <Route
            path="/livechat/:receiver_user_id"
            element={<ChatRouteComponent />}
          />
          
        </Routes>

        {shouldRenderNavbar && <Footer />}
      </div>
    </>
    )}
  </CartProvider>
  );
};

// ReactDOM.render(<App />, document.getElementById('root'));
export default App

