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
                Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Assuming you store JWT token in localStorage
            },
        });

        if (response.ok) {
            const data = await response.json();
            window.location.reload();
            // console.log('Image uploaded successfully:', data.image_url);
        } else {
            const errorData = await response.json();
            console.error('Error uploading image:', errorData.message);
        }
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};

const deleteImage = async () => {
    try {
        const response = await fetch('/deleteimage', {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`, // Assuming you store JWT token in localStorage
            },
        });

        if (response.ok) {
            console.log('Image deleted successfully');
            window.location.reload();
        } else {
            const errorData = await response.json();
            console.error('Error deleting image:', errorData.message);
        }
    } catch (error) {
        console.error('Error deleting image:', error);
    }
};

return (
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
);