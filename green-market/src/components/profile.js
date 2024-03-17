import React, { useState, useEffect } from 'react';
import './Profile.css'

function Profile({user}){
  // const [user, setUser] = useState([]);
  
  return(
    <div className='main-div'>
      <div className='profile-container'>
        <img src={user.image} alt='/'/>
        <div>{user.username}</div>
        <div>{user.email}</div>
        <div>{user.contact}</div>
      </div>
    </div>
  )
}



export default Profile