import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import default styles
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Order = () => {
    const [orderData, setOrderData] = useState(null);
    const location = useLocation(); // Access location object from React Router
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state && location.state.orderData) {
            // Extract order data from location state
            setOrderData(location.state.orderData);
        }
    }, [location.state]);

    const formatDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        return new Date(date).toLocaleDateString('en-US', options).replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+)/, '$3-$1-$2 $4:$5');
    };

    const handleOrderCancel = () => {
        setOrderData(null);
        navigate('/cart');
    };

    const handleOrderComplete = async () => {
        // Check if the user is logged in
        if (!isLoggedIn) {
            // If not logged in, redirect the user to the login page
            navigate('/login');
            return; // Stop further execution
        }

        // Confirm with the user before starting the order
        if (window.confirm("Are you sure you want to start this order?")) {
            try {
                // Prepare data to send in the request
                const requestData = {
                    product_id: orderData.product_id,
                    quantity_ordered: orderData.quantity_ordered,
                    current_time: formatDate(orderData.date),
                    total_order: orderData.total_order,
                };

                // Send POST request to the endpoint
                const response = await axios.post('/placeorder', requestData);
                alert(response.data.message); // You may replace alert with a toast notification
                const updatedOrderData = { ...orderData, status: 'started' };
                setOrderData(updatedOrderData);
                navigate('/order'); // Navigate back to the order page after completing the order
            } catch (error) {
                // Handle error
                console.error('Error placing order:', error);
                alert('Failed to start the order. Please try again later.'); // You may replace alert with a toast notification
            }
        }
    };

    const handleLogin = async () => {
        try {
            // Make a POST request to your backend login endpoint
            const response = await axios.post('/login', {
                username,
                password,
            });

            // Assuming your backend responds with a success message or token
            // Update isLoggedIn state to true
            setIsLoggedIn(true);

            // Redirect the user to the order page
            navigate('/order');
        } catch (error) {
            // Handle login error, such as displaying an error message
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials and try again.');
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
                <table className="table table-striped table-bordered mt-2">
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
                                <button className="btn btn-outline-danger" onClick={handleOrderCancel}>Cancel</button>
                                <button className="btn btn-success" onClick={handleOrderComplete}>Start Order</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Order;
