import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css"; // Import custom CSS file for styling

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Assistant",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegister = async () => {
    console.log(import.meta.env);
    const { name, email, password } = formData;
    if(!email || !password || !name) return alert("Email or Password cannot be empty\nPlease Try Again.");
    if(password.length < 8) return alert("Password must be of atleast 8 characters.")
    console.log(email, password)

    try {
      const {data} = await axios.post(`https://inventory-management-quhz.onrender.com/api/v1/register`, formData);
      
      console.log(data.user);
      // navigation.navigate('dashboard');
    } catch (error) {
      const { status, data } = error.response;
      console.log(status, data);
      if(status === 400 || status.status === 401) alert(data.message);
      else alert("Error in Registration\nPlease try again.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
    // console.log(formData);
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2>Register</h2>
        <div className="role-tabs">
          <div
            className={`role-tab ${
              formData.role === "Assistant" ? "active" : ""
            }`}
            onClick={() => setFormData({ ...formData, role: "Assistant" })}
          >
            Assistant
          </div>
          <div
            className={`role-tab ${
              formData.role === "Manager" ? "active" : ""
            }`}
            onClick={() => setFormData({ ...formData, role: "Manager" })}
          >
            Manager
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
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
          <button type="submit">Register</button>
          <div className="login-link">
            <p>
              Already have an account? <Link to="/">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
