import React, { useState, useEffect } from 'react';
import '../App.css';

const FarmerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/farmerorders', { 
      headers: { 
          Authorization: `Bearer ${localStorage.getItem('jwt')}`
      } 
    })
    .then(response => response.json())
    .then(data => {
      setOrders(data);
      setLoading(false);
    })
    .catch(error => {
      setError(error.message);
      setLoading(false);
    });
  }, []);

  const updateOrderStatus = (orderId, action) => {
    fetch(`/updateorder/${orderId}`, { 
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({ action })
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update order status');
      }
      return response.json();
    })
    .then(data => {
      
      window.alert(` ${data.message}`); 
      window.location.reload();
    })
    .catch(error => {
      console.error('Error updating order status:', error.message);
    });
  };

  return (
    <div className="container">
      <h2>Farmer Orders</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Order Date</th>
            <th>Total Price</th>
            <th>Order Status</th>
            <th>Customer usename</th>
            <th>Action</th> {/* Add column for action buttons */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td>{order.order_date}</td>
              <td>{order.total_price}</td>
              <td>{order.order_status}</td>
              <td>{order.customer_username}</td>
              <td>
                <button onClick={() => updateOrderStatus(order.order_id, 'cancel')}>Cancel</button>
                <button onClick={() => updateOrderStatus(order.order_id, 'complete')}>Complete Order</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerOrders;