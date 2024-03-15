import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddProductForm() {
    
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        quantity_available: '',
        category: '',
        image: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };
    

    const handleSubmit = (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (let key in formData) {
            formDataToSend.append(key, formData[key]);
        }
    
        fetch('/addproduct', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            body: formDataToSend
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.message
            ?   
                toast.success(data.message,
                    {
                        position: "top-right",
                        autoClose:2000,
                        onClose: ()=>
                        {
                            // updateEmployeeData(data.employee_data)
                            setFormData({
                                        name: '',
                                        description: '',
                                        price: '',
                                        quantity_available: '',
                                        category: '',
                                        image: null
                                    });
                                
                        }
                    })
            :
                toast.error(data.error,
                    {
                        position: "top-right",
                        autoClose: 2000
                    })
                })
            //  {

        //     setMessage(`Product added successfully`);
        //     setFormData({
        //         name: '',
        //         description: '',
        //         price: '',
        //         quantity_available: '',
        //         category: '',
        //         image: null
        //     });
        // })
        .catch(error => {
            console.error('There was a problem with your fetch operation:', error);
            // Handle error here
        });
    };
    

    return (
        <Form onSubmit={handleSubmit}>
             <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="light"
        
        />
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="price">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter price"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="quantity_available">
                    <Form.Label>Quantity </Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter quantity available"
                        name="quantity_available"
                        value={formData.quantity_available}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
            </Row>
            <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    required
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Add Product
            </Button>
            
            
        </Form>
    );
}

export default AddProductForm;
