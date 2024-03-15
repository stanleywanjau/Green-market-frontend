import React from 'react'
import  { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const Navbar = ({ onCategoryChange, user }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  
  
  const uniqueCategories = products ? [...new Set(products.map((product) => product.category))] : [];
  
  
  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    onCategoryChange(selectedValue);
  };

  return (
    <div>
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand"></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link toggler" href="#" role="button" onChange={handleCategoryChange} data-bs-toggle="" aria-expanded="" style={{ color: "white" }} id="featured">
                Featured Categories
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Action</a></li>
                <li><a className="dropdown-item" href="#">Another action</a></li>
                <li><a className="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link active" style={{ color: "white" }}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/cart" className="nav-link" style={{ color: "white" }}>Cart</Link>
            </li>
            {user && user.role === 'farmer' ? (
              <>
              <li className="nav-item">
                <Link to="/farmerproduct" className="nav-link" style={{ color: "white" }}>my product</Link>
                </li>
              <li className="nav-item">
              <Link to="/farmerorder" className="nav-link" style={{ color: "white" }}>my orders</Link>
              </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  </div>
  )
}

export default Navbar