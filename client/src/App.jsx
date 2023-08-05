import { useState } from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard'; 

function App() {
  const [currentUser, setCurrentUser] = useState(0);

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
