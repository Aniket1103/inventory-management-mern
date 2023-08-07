import { useEffect, useState } from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard'; 
import axios from 'axios';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const getUser = async () => {
    try {
      const { data } = await axios.get(`https://inventory-management-quhz.onrender.com/api/v1/currentUser`, {
        withCredentials: true
      })
      console.log("Current User: ", data);
      setCurrentUser(data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    console.log(import.meta.env)
    getUser();
  }, [])

  return (
    <Router>
      <Routes>
        <Route path={currentUser ? "/dashboard" : "/"} element={currentUser ? <Dashboard currentUser={currentUser} /> : <Login />} /> 
        <Route path="/register" element={<Register />} /> 
      </Routes>
    </Router>
  );
}

export default App;
