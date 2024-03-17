import React, { useState, useEffect } from "react";

const ChatComponent = ({ product_id }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Log product_id for debugging
  console.log(product_id);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/chatsendermessages/${product_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (product_id) {
      fetchMessages();
    }
  }, [product_id]);

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
    setIsLoading(true);
    try {
      const response = await fetch(`/chatsendermessages/${product_id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({ message_text: newMessage }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div>
      <h2>Chat about Product ID: {product_id}</h2>
      {error && <p>{error}</p>}
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {messages.map((message) => (
              <li key={message.id}>
                <strong>
                  {message.sender_id === "Your User ID" ? "You" : "Farmer"}:
                </strong>
                : {message.message_text}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
