import React from "react";
import { useCart } from "react-use-cart";
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = async (productId, quantity) => {
    const orderData = {
      product_id: productId,
      quantity_ordered: quantity
    };
    
    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('jwt');
    if (!isAuthenticated) {
      // Redirect to signup/login page
      navigate('/signup');
      return;
    }

    try {
      const response = await fetch('https://green-market-backend-2es1.onrender.com/placeorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        // Order placed successfully, you can handle the response as needed
        console.log('Order placed successfully');
      } else {
        // Handle error case
        console.error('Failed to place order');
      }
    } catch (error) {
      console.error('Error placing order:', error);
    }
  };

  function navigateHome() {
    navigate(`/`); 
  }

  if (isEmpty) return <h1>Your Cart is Empty</h1>;

  return (
    <div className="cart-section">
      <div>
        <h5>Cart ({totalUniqueItems}) total Items</h5>
        <table>
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>
                    <img className="cart-image" src={item.image} alt={item.title} style={{ height: '7rem', width: "7rem" }} />
                  </td>
                  <td>{item.title}</td>
                  <td>
                    <p>{item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                  </td>
                  <td>Quantity ({item.quantity})</td>
                  <td>
                    <button className="btn btn-outline-danger" onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                    <button className="btn btn-outline-success" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                    <button className="btn btn-success" onClick={() => removeItem(item.id)}>Remove Item</button>
                    <button className="btn btn-success" onClick={() => handlePlaceOrder(item.id, item.quantity)}>Place Order</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {cartTotal && (
        <div>
          <h2>Total Price: {cartTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</h2>
        </div>
      )}
      <div className="cart-below">
        <button className="btn btn-success" onClick={() => window.confirm("Are you sure you want to clear the cart?") && emptyCart()}>Clear Cart</button>
        <button className="btn btn-outline-secondary" onClick={navigateHome}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default Cart;
