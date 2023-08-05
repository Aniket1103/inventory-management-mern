import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css"; 

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLogin = async () => {
    const { email, password } = formData;
    if(!email || !password ) return alert("Email or Password cannot be empty\nPlease Try Again.");
    if(password.length < 8) return alert("Password must be of atleast 8 characters.")
    console.log(email, password)

    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      }
      const response = await axios.post("https://inventory-management-quhz.onrender.com/api/v1/login", {
          email,
          password
      }, config);
      
      console.log("login response", response);
      navigation.navigate('dashboard');
    } catch (error) {
      const { status, data } = error.response;
      // console.log(status, data);
      if(status === 400 || status === 401) alert("Invalid email or password,\nPlease verify once.");
      else alert("Error Logging in\nPlease try again.");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission here (e.g., send data to the backend API for login).
    await handleLogin();
    console.log(formData);
  };

  const handleContinueAsGuest = async () => {
    // Handle "Continue as Guest" button action here
    setFormData({
      email: "assistant1@gmail.com",
      password: "assistant1pass"
    })
    await handleLogin();
    console.log("Continue as Guest clicked!");
  };


  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          <div className="continue-as-guest">
            <button onClick={handleContinueAsGuest}>Continue as Guest</button>
          </div>
          <div className="register-link">
            <p>
              Don't have an account? <Link to="/register">Register here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
