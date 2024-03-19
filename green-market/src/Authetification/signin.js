import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Authetification.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://green-market-backend-2es1.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          localStorage.setItem('jwt', user.access_token);
          navigate('/');
          toast.success("Login successful!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      } else {
        r.json().then((error) => {
          setError(error.message); 
          toast.error(error.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      }
    }).catch(error => {
      setError("An error occurred. Please check your internet connection.");
      toast.error("An error occurred. Please check your internet connection.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    });
  }
  

  return (
    <div className="login-container ">
      <form className="login-form">
        <p className="heading">Login</p>
        <p className="paragraph">Login to your account</p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <div className="input-group">
          <input
            required=""
            placeholder="Username"
            id="username name="
            type="text"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            required=""
            placeholder="Password"
            name="password"
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" onClick={handleSubmit}>Login</button>
        <div className="bottom-text">
          <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
          <p><Link to='/forgot-password'>Forgot password?</Link></p>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
