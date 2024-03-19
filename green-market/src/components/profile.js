import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import default styles

function Profile() {
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const uploadImage = async () => {
        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await fetch('/uploadimage', {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                window.location.reload();
                toast.success('Image uploaded successfully'); // Display success toast
            } else {
                const errorData = await response.json();
                toast.error('Error uploading image: ' + errorData.message); // Display error toast
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            toast.error('Error uploading image: ' + error.message); // Display error toast
        }
    };

    const deleteImage = async () => {
        try {
            const response = await fetch('/deleteimage', {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            });

            if (response.ok) {
                console.log('Image deleted successfully');
                toast.success('Image deleted successfully'); // Display success toast
                window.location.reload();
            } else {
                const errorData = await response.json();
                toast.error('Error deleting image: ' + errorData.message); // Display error toast
            }
        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('Error deleting image: ' + error.message); // Display error toast
        }
    };

    return (
        <div>
            <Form>
                <Form.Group controlId="image">
                    <Form.Label>Image</Form.Label>
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
