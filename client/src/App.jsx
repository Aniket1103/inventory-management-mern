import { useEffect, useState } from 'react';
// import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Dashboard from './components/Dashboard/Dashboard'; 
import axios from 'axios';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  console.log("currUser: ", currentUser)

  const userState = {
    value : currentUser,
    set : setCurrentUser
  }

  const getUser = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/currentUser`, {
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
        {
          !currentUser ? (
            <>
              <Route path="/" element={ <Login /> } /> 
              <Route path="/register" element={<Register />} /> 
            </>
          ) : (
            <>
              <Route path="/" element={<Dashboard userState={userState} /> } /> 
              <Route path="/dashboard" element={<Dashboard userState={userState} /> } /> 
            </>
          )
        }
      </Routes>
    </Router>
  );
}

export default App;
