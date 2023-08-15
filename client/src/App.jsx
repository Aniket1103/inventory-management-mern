import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import axios from 'axios';

const Dashboard = lazy(() => import('./components/Dashboard/Dashboard'));
const Login = lazy(() => import('./components/Login/Login'));
const Register = lazy(() => import('./components/Register/Register'));

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  console.log("currUser: ", currentUser)

  const userState = {
    value : currentUser,
    set : setCurrentUser
  }

  useEffect(() => {
    const getUser = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/currentUser`, {
          withCredentials: true
        })
        console.log("Current User: ", data);
        setCurrentUser(data);
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
      finally{
        setIsLoading(false);
      }
    }
    
    getUser();
  }, [])

  if(isLoading){
    return <p>Loading....</p>
  }
  if(isError){
    return <p>Something went wrong, Try again later.</p>
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              {currentUser ? (
                <Dashboard userState={userState} />
              ) : (
                <Login />
              )}
            </Suspense>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              {currentUser ? <Dashboard userState={userState} /> : null}
            </Suspense>
          }
        />
        <Route
          path="/register"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Register />
            </Suspense>
          }
        />
      </Routes>
    </Router>

  );
}

export default App;
