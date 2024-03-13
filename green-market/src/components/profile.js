import axios from  "axios"

import React, { useState } from 'react';

function Profile() {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // POST request to create a new user
    if (!name) {
      const response = await axios.post('/api/users', { image });
      console.log(response);
    }

    // PUT request to update an existing user
    if (name && image) {
      const response = await axios.put(`/api/users/${name}`, { image });
      console.log(response);
    }

    // DELETE request to delete an account
    if (name && !image) {
      const response = await axios.delete(`/api/users/${name}`);
      console.log(response);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleImageChange} />
      <input type="text" value={name} onChange={handleNameChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Profile;


