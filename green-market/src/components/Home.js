import React from 'react';
import { useCart } from 'react-use-cart';
import { useNavigate } from 'react-router-dom';

const Home = ({ products }) => {
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
    <div className="card-container">
      {products.map((product) => (
        <div key={product.id} className="card">
          <img
            src={product.image}
            alt={product.name}
            className="card-image"
            style={{ width: '250px', height: '250px', objectFit: 'cover' }}
          />
          <div className="card-content">
            <div>{product.name}</div>
            <div>{product.price}</div>
            <div>{product.category}</div>
            <button onClick={() => navigateToProductDetails(product.id)}
            className='btn btn-success'>more details</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
