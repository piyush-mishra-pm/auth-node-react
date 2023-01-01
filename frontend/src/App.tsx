import React, {useState, useEffect} from 'react';

import RegisterForm from './components/RegisterForm';

import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import HeaderNav from './components/HeaderNav';

import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';

// Configuring default BaseUrl
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000/api/v1';
axios.defaults.withCredentials = true;

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get('/user');
        setLoggedInUser(response.data);
      } catch (e) {
        setLoggedInUser(null);
      }
    })();
  }, [loggedInStatus]);

  return (
    <div>
      <BrowserRouter>
        <HeaderNav loggedInUser={loggedInUser} setLoggedInStatus={() => setLoggedInStatus(false)} />
        <Route path="/register" component={RegisterForm} />
        <Route path="/forgot" component={ForgotPassword} />
        <Route path="/reset/:token" component={ResetPassword} />
        <Route
          path="/login"
          exact
          component={() => <Login loggedInUser={loggedInUser} setLoggedInStatus={() => setLoggedInStatus(true)} />}
        />
        <Route path="/" exact component={() => <Home loggedInUser={loggedInUser} />} />
      </BrowserRouter>
    </div>
  );
}

export default App;
