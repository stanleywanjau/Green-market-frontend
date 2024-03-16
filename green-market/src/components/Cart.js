import React from "react";
import { useCart } from "react-use-cart";
import { useNavigate } from 'react-router-dom';



const Cart = () => {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  const navigate = useNavigate();
  const generateOrderId = () => {
    // Implement your logic to generate a unique order ID
    return Math.floor(Math.random() * 1000000); // Example: Generating a random order ID
  };
  function navigateHome() {
    navigate(`/`); 
  }


  const handleOrderClick = () => {
    if (isEmpty) {
      // Handle case where cart is empty
      return;
    }
    
  const handleShopClick = () => {

  }
    // Extract cart data
    const orderData = {
      orderId: generateOrderId(),
      items: items,
      total: cartTotal,
      date: new Date().toISOString(), // Set order date to current date
      status: 'pending', // Set initial order status
    };

    // Navigate to the Order component and pass order data as state
    navigate('/order', { state: { orderData } });
  };
  

  if (isEmpty) return <h1>Your Cart is Empty</h1>;

  return (
    
       
        
          <div className="cart-section">
            <div>
              <h5>Cart ({totalUniqueItems}) total Items: ({totalItems})</h5>
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
                          <p style={{ marginLeft: "100px" }}>{item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</p>
                        </td>
                        <td>Quantity ({item.quantity})</td>
                        <td>
                          <button className="btn btn-outline-danger" style={{ marginLeft: "250px" }} onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                          <button className="btn btn-outline-success" onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                          <button className="btn btn-success" style={{ marginLeft: "250px" }} onClick={() => removeItem(item.id)}>Remove Item</button>
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
              <button className="btn btn-success" onClick={() => ("Are you sure you want to clear the cart?") && emptyCart()}>Clear Cart</button>
              <button className="btn btn-outline-secondary" onClick={()=>navigateHome()}>Countinue Shopping</button>
              <button className="btn btn-success" onClick={handleOrderClick} style={{ marginLeft: "750px" }}>Order Now</button>
            </div>
          </div>
        
      
    
  );
};

export default Cart;
