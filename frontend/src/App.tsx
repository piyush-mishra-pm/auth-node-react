import React, {useState, useEffect} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import apiWrapper from './apis/apiWrapper';

import RegisterForm from './pages/RegisterForm';
import Home from './pages/Home';
import Login from './pages/Login';
import HeaderNav from './pages/HeaderNav';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

import './App.css';
import ToastContainerWrapper from './components/ToastContainerWrapper';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInStatus, setLoggedInStatus] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await apiWrapper.get('/user');
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
        <ToastContainerWrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;
