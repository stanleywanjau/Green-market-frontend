import React, { useState } from 'react';
import { Form, Button, Image } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
    const [imageFile, setImageFile] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        if (selectedImage) {
            setImageFile(selectedImage);
            setPreviewImage(URL.createObjectURL(selectedImage));
        }
    };

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch('https://green-market-backend-2es1.onrender.com/uploadimage', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                window.location.reload();
                toast.success('Image uploaded successfully');
            } else {
                const errorData = await response.json();
                toast.error('Error uploading image: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image: ' + error.message);
        }
    };

    const deleteImage = async () => {
        try {
            const response = await fetch('https://green-market-backend-2es1.onrender.com/deleteimage', {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });

            if (response.ok) {
                console.log('Image deleted successfully');
                toast.success('Image deleted successfully');
                window.location.reload();
            } else {
                const errorData = await response.json();
                toast.error('Error deleting image: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('Error deleting image: ' + error.message);
        }
    };

    return (
        <div>
            <Form>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
                    {previewImage ? ( // If preview image exists, render it
                        <Image src={previewImage} className='img-choosen' alt="Preview" thumbnail />
                    ) : (
                        <Image src="https://iili.io/JVksC6Q.png"  className='img-choosen' alt="Placeholder" thumbnail /> // Otherwise, render the placeholder image
                    )}
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </Form.Group>
                <Button variant="primary" onClick={uploadImage}>
                    Upload Image
                </Button>
                <Button variant="danger" onClick={deleteImage}>
                    Delete Image
                </Button>
            </Form>
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
            />
        </div>
    );
}

export default Profile;
