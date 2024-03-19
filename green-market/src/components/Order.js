import React, { useState } from 'react';

const OrderItem = ({ item }) => {
  // State variables to manage order quantity, form submission, and order status
  const [quantity, setQuantity] = useState(1);
  const [isOrdered, setIsOrdered] = useState(false);

  // Function to handle quantity change
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Order placed for ${quantity} ${item.name}`);
    // Set isOrdered to true to display a success message
    setIsOrdered(true);
  };
  const handleCancelOrder = () => {
    // Reset quantity and order status
    setQuantity(1);
    setIsOrdered(false);
  };

  return (
    <div>
      <h2>{item.name}</h2>
      <p>Price: ${item.price}</p>
      {!isOrdered ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
          <button type="submit">Place Order</button>
        </form>
      ) : (
        <div>
          <p>Order placed successfully!</p>
          <button onClick={handleCancelOrder}>Cancel Order</button>
        </div>
      )}
    </div>
  );
};

export default OrderItem;
