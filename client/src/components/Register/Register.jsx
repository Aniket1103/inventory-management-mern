import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Register.css";
import { toast, Toaster } from "react-hot-toast";

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
      const {data} = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/register`, formData, {
        withCredentials: true,
      });
      
      console.log(data.user);
      toast.success(data.message || "Registered Successfully");
      navigation.navigate('dashboard');
    } catch (error) {
      if(!error.resoponse || !error.response.status || !error.response.data) toast.error(data.message, "Error in Registration");
      const { status, data } = error.response;
      console.log(status, data);
      if(status === 400 || status === 401) toast.error(data.message, "Error in Registration");
      else toast.error("Error in Registration\nPlease try again.");
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
        <Toaster />
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
