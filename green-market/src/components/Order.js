import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await fetch('https://green-market-backend-2es1.onrender.com/customerorders', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          console.error('Failed to fetch order history');
        }
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, []);

  function navigateHome() {
    navigate(`/`); 
  }

  return (
    <div>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="table table-striped table-bordered mt-3">
          <thead>
            <tr>
              <th scope="col">Order ID</th>
              <th scope="col">product name</th>
              <th scope="col">Order Date</th>
              <th scope="col">Total Price</th>
              <th scope="col">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td data-label="order id">{order.order_id}</td>
                <td data-label="order id">{order.product_name}</td>
                <td data-label="order date">{order.order_date}</td>
                <td data-label="order total price">{order.total_price}</td>
                <td data-label="order status">{order.order_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="btn btn-outline-secondary" onClick={navigateHome}>Go Back</button>
    </div>
  );
};

export default OrderHistory;