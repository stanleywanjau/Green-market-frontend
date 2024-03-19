import React, { useState } from "react";
import "./Authetification.css";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [forgotEmail, setForgotEmail] = useState(false);
  const [new_password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    fetch("https://green-market-backend-2es1.onrender.com/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
    .then((response) => {
      if (response.ok) {
        setForgotEmail(true);
        setMessage("OTP sent to your email. Please check your inbox.");
        toast.success("OTP sent to your email. Please check your inbox.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        response.json().then((error) => {
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
    })
    .catch(error => {
      setError("An error occurred. Please try again later.");
      toast.error("An error occurred. Please try again later.", {
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

  function handleChangePassword(e) {
    e.preventDefault();
    fetch("https://green-market-backend-2es1.onrender.com/change-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, otp, new_password, password_confirmation: passwordConfirmation }),
    })
    .then((response) => {
      if (response.ok) {
        navigate('/login');
        setMessage("Password changed successfully.");
        toast.success("Password changed successfully.", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        response.json().then((error) => {
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
    })
    .catch(error => {
      setError("An error occurred. Please try again later.");
      toast.error("An error occurred. Please try again later.", {
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
    <>
      {forgotEmail ? (
        <div className="center-screen">
          <div className="email-verification-page">
            <div>{message}</div>
            <h2>Enter OTP</h2>
            <form onSubmit={handleChangePassword}>
              <label htmlFor="otp">OTP:</label>
              <input
                type="text"
                id="otp"
                placeholder="OTP"
                name="otp"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                required
              />

              <input
                type="hidden"
                id="email"
                name="email"
                value={email}
              />
              <label htmlFor="otp">Password:</label>
              <input
                type='password'
                placeholder="NewPassword"
                id='password'
                name='password'
                value={new_password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="otp">confirm Password:</label>
              <input
                type='password'
                id='passwordConfirmation'
                placeholder="Confirm Password"
                name='passwordConfirmation'
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
                required
              />
              <button type="submit">change password</button>
            </form>
          </div>
        </div>
      ) : (
        <div className="form-container">
          <div className="logo-container">
            Forgot Password
          </div>

          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Enter your email"
                required=""
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button className="form-submit-btn" type="submit">Send Email</button>
          </form>

          {error && <p style={{ color: 'red' }}>{error}</p>}
          {message && <p style={{ color: 'green' }}>{message}</p>}
        </div>
      )}
      <ToastContainer />
    </>
  );
}

export default ForgotPassword;
