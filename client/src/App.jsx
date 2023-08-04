import { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import necessary components from react-router-dom
import Login from './components/Login/Login';
import Register from './components/Register/Register';
// import Dashboard from './components/Dashboard/Dashboard'; // Import your Dashboard component

function App() {
  const [currentUser, setCurrentUser] = useState(0);

  return (
    <Router>
      {/* Use the Router component to wrap your routes */}
      <Routes>
        {/* Define individual routes using the Route component */}
        <Route path="/" element={<Login />} /> {/* Render Login component for the root path */}
        <Route path="/register" element={<Register />} /> {/* Render Register component for the /register path */}
        {/* <Route path="/dashboard" element={<Dashboard />} />  */}
      </Routes>
    </Router>
  );
}

export default App;
