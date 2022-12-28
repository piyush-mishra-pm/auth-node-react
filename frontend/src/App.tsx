import React from 'react';

import RegisterForm from './components/RegisterForm';

import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Route path="/register" component={RegisterForm} />
      <Route path="/login" component={Login} />
      <Route path="/" exact component={Home} />
    </BrowserRouter>
  );
}

export default App;
