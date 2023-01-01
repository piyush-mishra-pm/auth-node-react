import React from 'react';

import RegisterForm from './components/RegisterForm';

import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import HeaderNav from './components/HeaderNav';
import Logout from './components/Logout';

// Configuring default BaseUrl
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000/api/v1';

function App() {
  return (
    <div>
      <BrowserRouter>
        <HeaderNav />
        <Route path="/register" component={RegisterForm} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="/" exact component={Home} />
      </BrowserRouter>
    </div>
  );
}

export default App;
