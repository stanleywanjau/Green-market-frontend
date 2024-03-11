
import React from 'react';

const UserProfile= ({ user }) => {
  const { name, profilePicture, bio } = user;

  return (
    <div className="profile-component">
      <img src={profilePicture} alt={`${name}'s profile`} className="profile-picture" />
      <div className="profile-info">
        <h2>{name}</h2>
        <p className="bio">{bio}</p>
      </div>
    </div>
  );
};

export default UserProfile;
