import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [userIcon, setUserIcon] = useState(null); // State to store user icon URL

  useEffect(() => {
    // Fetch user icon URL from backend when component mounts
    const fetchUserIcon = async () => {
      try {
        const response = await axios.get('/user-icon'); // Adjust endpoint accordingly
        setUserIcon(response.data.userIconUrl); // Assuming response contains userIconUrl
      } catch (error) {
        setError(error.response.data.message);
      }
    };

    fetchUserIcon();

    // Clean up function to prevent memory leaks
    return () => {
      setUserIcon(null); // Clear userIcon state when component unmounts
    };
  }, []);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('/uploadimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete('/delete-account');
      console.log(response.data);
      // Redirect to login page or perform any other action after account deletion
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleImageUpdate = async () => {
    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.put('/updateimage', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleImageDelete = async () => {
    try {
      const response = await axios.delete('/deleteimage');
      console.log(response.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Your Profile</h2>
      {userIcon && <img src={userIcon} alt="User Icon" />} {/* Display user icon */}
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleImageUpload}>Upload Image</button>
      </div>
      <div>
        <button onClick={handleDeleteAccount}>Delete Account</button>
      </div>
      <div>
        <button onClick={handleImageUpdate}>Update Image</button>
        <button onClick={handleImageDelete}>Delete Image</button>
      </div>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Profile;
