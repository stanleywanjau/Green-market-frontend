import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import default styles
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Order = () => {
    const [orderData, setOrderData] = useState(null);
    const location = useLocation(); // Access location object from React Router

    useEffect(() => {
        if (location.state && location.state.orderData) {
            // Extract order data from location state
            setOrderData(location.state.orderData);
        }
    }, [location.state]);

    console.log(orderData)

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

            const requestData = {
                product_id: orderData.product_id,
                quantity_ordered: orderData.quantity_ordered,
                current_time: formatDate(orderData.date),
                total_order: orderData.total_order
            };

            //  POST request to the endpoint
            axios.post('/placeorder', requestData)
                .then(response => {
                    // Display success toast
                    toast.success(response.data.message, {
                        position: "top-right",
                        autoClose: 2000
                    });

                    const updatedOrderData = { ...orderData, status: 'started' };
                    setOrderData(updatedOrderData);
                })
                .catch(error => {
                    // Display error toast
                    toast.error('Failed to start the order. Please try again later.', {
                        position: "top-right",
                        autoClose: 2000
                    });
                    console.error('Error placing order:', error);
                });
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
