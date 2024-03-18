import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Form, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const LiveChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [received, setReceived] = useState('');
    const { receiver_user_id } = useParams();

    const fetchMessages = async () => {
        try {
            const response = await axios.get('/chatmessages', { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } });
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const fetchSenderMessages = async () => {
        try {
            const response = await axios.get('/chatsendermessages', { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } });
            setReceived(response.data);
        } catch (error) {
            console.error('Error fetching sender messages:', error);
        }
    };

    useEffect(() => {
        fetchMessages();
        fetchSenderMessages();
    }, []);

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/chatsendermessages/${receiver_user_id}`, { message_text: newMessage }, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } });
            setNewMessage('');
            // fetchMessages();
            fetchSenderMessages();
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleDeleteMessage = async (messageId) => {
        try {
            await axios.delete(`/deletemessage/${messageId}`, { headers: { Authorization: `Bearer ${localStorage.getItem('jwt')}` } });
    
            // Update messages state by filtering out the deleted message
            setMessages(messages.filter(message => message.id !== messageId));
    
            // Update received state by filtering out the deleted message
            setReceived(received.filter(message => message.id !== messageId));
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };
    // Combine messages and received messages, sort them by timestamp
    const combinedMessages = [
        ...messages,
        ...(received ? received.filter((receivedMessage) => (
          !messages.some((message) => message.id === receivedMessage.id)
        )) : [])
      ].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    return (
        <div>
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
        </div>
    );
};

export default LiveChat;
