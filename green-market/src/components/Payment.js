import React, { useState, useEffect } from "react";
 
function STKPushComponent() {
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(""); // State to hold the phone number
 
  // Fetch orders on component mount
  useEffect(() => {
    fetch("http://localhost:5555/customerorders") // Adjust URL as needed
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);
 
  const triggerPayment = () => {
    fetch(`http://localhost:5000/trigger-payment`, {
      // Removed orderId from URL, now sending in body
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order_id: selectedOrderId,
        phone_number: phoneNumber,
      }), // Send orderId and phoneNumber in the request body
    })
      .then((response) => response.json())
      .then((data) => console.log("Payment triggered:", data))
      .catch((error) => console.error("Error triggering payment:", error));
  };
 
  return (
    <div>
      <h1>Orders</h1>
      <ul>
        {orders.map((order) => (
          <li key={order.order_id} style={{ marginBottom: "10px" }}>
            Order ID: {order.order_id}, Date: {order.order_date}, Total Price:{" "}
            {order.total_price}, Status: {order.order_status}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => setSelectedOrderId(order.order_id)}
            >
              Select
            </button>
          </li>
        ))}
      </ul>
      {selectedOrderId && (
        <div>
          <h2>Selected Order ID: {selectedOrderId}</h2>
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <button onClick={triggerPayment}>Trigger Payment</button>
        </div>
      )}
    </div>
  );
}
 
export default STKPushComponent;