import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify'; // Import toast from react-toastify

const LiveChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [received, setReceived] = useState('');
    const { receiver_user_id } = useParams();
    const [loading, setLoading] = useState(true); // State to track loading state

    const fetchMessages = async () => {
        try {
            const response = await axios.get('https://green-market-backend-2es1.onrender.com/chatmessages', { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
            // Display error toast
            toast.error('Error fetching messages', {
                position: "top-right",
                autoClose: 2000
            });
        } finally {
            setLoading(false); // Set loading state to false after fetching
        }
    };

    const fetchSenderMessages = async () => {
        try {
            const response = await axios.get('https://green-market-backend-2es1.onrender.com/chatsendermessages', { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } });
            setReceived(response.data);
        } catch (error) {
            console.error('Error fetching sender messages:', error);
            // Display error toast
            toast.error('Error fetching sender messages', {
                position: "top-right",
                autoClose: 2000
            });
        }
    };

    useEffect(() => {
        fetchMessages();
        fetchSenderMessages(); // Fetch sender messages on every render
    }, []);

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`https://green-market-backend-2es1.onrender.com/chatsendermessages/${receiver_user_id}`, { message_text: newMessage }, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } });
            setNewMessage('');
            // Display success toast
            toast.success('Message sent successfully', {
                position: "top-right",
                autoClose: 2000
            });
            fetchSenderMessages(); // Fetch sender messages after sending a message
        } catch (error) {
            console.error('Error sending message:', error);
            // Display error toast
            toast.error('Error sending message', {
                position: "top-right",
                autoClose: 2000
            });
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            await axios.delete(`https://green-market-backend-2es1.onrender.com/deletemessage/${messageId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } });
            setMessages(messages.filter(message => message.id !== messageId));
            setReceived(received.filter(message => message.id !== messageId));
            // Display success toast
            toast.success('Message deleted successfully', {
                position: "top-right",
                autoClose: 2000
            });
        } catch (error) {
            console.error('Error deleting message:', error);
            // Display error toast
            toast.error('Error deleting message', {
                position: "top-right",
                autoClose: 2000
            });
        }
    };

    const combinedMessages = [
        ...messages,
        ...(received ? received.filter((receivedMessage) => (
          !messages.some((message) => message.id === receivedMessage.id)
        )) : [])
      ].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return (
        <div>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <ListGroup>
                        {combinedMessages.map(message => (
                            <ListGroup.Item key={message.id}>
                                <strong> {message.sender_name}</strong>: {message.message_text}
                                <Button variant="danger" onClick={() => handleDeleteMessage(message.id)}>Delete</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <Form onSubmit={handleMessageSubmit}>
                        <Form.Group>
                            <Form.Control type="text" placeholder="Type your message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                        </Form.Group>
                        <Button type="submit">Send</Button>
                    </Form>
                </>
            )}
        </div>
    );
};

export default LiveChat;
