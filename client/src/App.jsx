import { useEffect, useState } from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard'; 

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
      console.log(error.response.data);
    }
  }
  useEffect(() => {
    console.log(import.meta.env)
    getUser();
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/dashboard" element={<Dashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;
