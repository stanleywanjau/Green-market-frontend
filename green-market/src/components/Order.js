import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Order = () => {
    const [orderData, setOrderData] = useState(null);
    const location = useLocation(); // Access location object from React Router

    useEffect(() => {
      if (location.state && location.state.orderData) {
        // Extract order data from location state
        setOrderData(location.state.orderData);
      }
    }, [location.state]);

    const navigate = useNavigate();
    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(date).toLocaleDateString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+)/, '$3-$1-$2 $4:$5');
      };

    const handleOrderCancel = () => {
        
        setOrderData(null);
        
        navigate('/cart');
      };

      const handleOrderComplete = () => {
        // Confirm with the user before starting the order
        if (window.confirm("Are you sure you want to start this order?")) {
          // Update the order status to "started"
          const updatedOrderData = { ...orderData, status: 'started' };
          setOrderData(updatedOrderData);
          // Optionally, you can send an API request to update the order status on the server
          // Navigate back to the cart page
        //   navigate('/cart');
        }
        
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
    
        {orderData && (
          <table className="table table-striped table-bordered mt-2" >
            <thead>
              <tr>
                <th scope="col">Order ID</th>
                <th scope="col">Order Date</th>
                <th scope="col">Total Price</th>
                <th scope="col">Order Status</th>
                <th scope="col">Action</th> 
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{orderData.order_id}</td>
                <td>{formatDate(orderData.date)}</td>
                <td>{orderData.total}</td>
                <td>{orderData.status}</td>
                <td>
                  <button className="btn btn-outline-danger" onClick={() => handleOrderCancel()}>Cancel</button>
                  <button className="btn btn-success" onClick={() => handleOrderComplete(orderData.order_id)}>Start Order</button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
};

export default Order;
