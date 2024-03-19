import React, { useState, useEffect } from 'react';
import './Table.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.success(data.message); // Display success toast
      // Reload the page after updating order status
      window.location.reload();
    })
    .catch(error => {
      console.error('Error updating order status:', error.message);
      toast.error('Failed to update order status'); // Display error toast
    });
  };

  return (
    <div className="container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <table className="table table-striped table-bordered mt-3">
        <thead>
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Order Date</th>
            <th scope="col">Total Price</th>
            <th scope="col">Order Status</th>
            <th scope="col">Customer usename</th>
            <th scope="col">Action</th> 
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td>{order.order_id}</td>
              <td data-label="order date">{order.order_date}</td>
              <td data-label="total price">{order.total_price}</td>
              <td data-label="total status">{order.order_status}</td>
              <td data-label="customer username">{order.customer_username}</td>
              <td>
                <button onClick={() => updateOrderStatus(order.order_id, 'cancel')}  type="button" className="btn btn-success">Cancel</button>
                <button onClick={() => updateOrderStatus(order.order_id, 'complete')}  type="button" className="btn btn-success">Complete Order</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FarmerOrders;
