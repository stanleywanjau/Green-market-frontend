import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Authetification.css";
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState('');
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [contact, setContact] = useState('');
  const [otp, setOTP] = useState("");
  const [emailVerification, setEmailVerification] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setError(null); // Clear previous errors
    if (username && email && password && password === passwordConfirmation) {
      fetch("https://green-market-backend-2es1.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          role,
          password,
          contact,
          password_confirmation: passwordConfirmation,
        }),
      }).then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setEmailVerification(user);
          });
        } else {
          r.json().then((error) => {
            setError(error.message);
          });
        }
      });
    } else {
      const newErrors = {};
      if (!username) {
        newErrors.username = "Username is required";
      }
      if (!email) {
        newErrors.email = "Email is required";
      }
      if (!password) {
        newErrors.password = "Password is required";
      }
      if (password !== passwordConfirmation) {
        newErrors.passwordConfirmation = "Passwords do not match";
      }
      setErrors(newErrors);
    }
  }

  function handleOTPSubmit(e) {
    e.preventDefault();
    fetch("https://green-market-backend-2es1.onrender.com/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        role,
        otp,
        password,
        password_confirmation: passwordConfirmation,
      }),
    })
    .then(r => r.json())
    .then(data => {
      if (data.access_token) {
        localStorage.setItem('jwt', data.access_token);
        if (role === 'farmer') {
          navigate('/farmdetails'); 
        } else {
          navigate('/');
        }
      } else {
        setError(data.message || 'Registration failed');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setError('An error occurred. Please try again later.');
    });
  }
  
  if (emailVerification) {
    return (
      <div className="center-screen">
        <div className="email-verification-page">
          <div>{emailVerification.message}</div>
          <h2>Enter OTP</h2>
          <form onSubmit={handleOTPSubmit}>
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              name="otp"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              required
            />
            <input
              type="hidden"
              id="email"
              name="email"
              value={emailVerification.email}
            />
            <button type="submit">Verify Me</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className='form-get-in '>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required
          />
          {errors.username && <div className='error'>{errors.username}</div>}
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
          {errors.email && <div className='error'>{errors.email}</div>}
        </div>
        <div>
          <label htmlFor='Role'>Role</label>
          <select
            id='Role'
            name='Role'
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value=''>Select Role</option>
            <option value='customer'>Customer</option>
            <option value='farmer'>Farmer</option>
          </select>
        </div>
        <div>
          <label htmlFor='contact'>Contact</label>
          <PhoneInput
            international
            className ='number'
            defaultCountry="KE"
            value={contact}
            onChange={setContact}
            required
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />
          {errors.password && <div className='error'>{errors.password}</div>}
        </div>
        <div>
          <label htmlFor='passwordConfirmation'>Confirm Password</label>
          <input
            type='password'
            id='passwordConfirmation'
            name='passwordConfirmation'
            value={passwordConfirmation}
            onChange={(e)=>setPasswordConfirmation(e.target.value)}
            required
          />
          {errors.passwordConfirmation && <div className='error'>{errors.passwordConfirmation}</div>}
        </div>
        <button className="cssbuttons-io-button" type="submit">
          Sign Up
          <div className="icon">
            <svg
              height="24"
              width="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
        </button>
      </form>
      <div>
        <p>Already have an account? <Link to='/login'>Log in</Link></p>
      </div>
    </div>
  );
}

export default SignUp;
