import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {useSelector} from 'react-redux';

import RegisterForm from './pages/RegisterForm';
import Home from './pages/Home';
import Login from './pages/Login';
import HeaderNav from './pages/HeaderNav';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import ToastContainerWrapper from './components/ToastContainerWrapper';
import NotFound from './pages/NotFound';
import ResetPasswordMailSent from './pages/ResetPasswordMailSent';
import LoadingSpinner from './components/LoadingSpinner';
import {UI_PAYLOAD} from './store/PAYLOAD_DEFINITIONS';
import {STATE} from './store/STATE_DEFINITIONS';

import './App.css';

function App() {
  const uiState: UI_PAYLOAD = useSelector((state: STATE) => state.ui);
  return (
    <div>
      <BrowserRouter>
        <HeaderNav />
        <Switch>
          {
            /* Show Loading Spinner if state says so. */
            uiState && uiState.isLoading && <LoadingSpinner />
          }
          <Route path="/register" exact component={RegisterForm} />
          <Route path="/forgot" exact component={ForgotPassword} />
          <Route path="/reset/:token" exact component={ResetPassword} />
          <Route path="/reset_mail_sent" exact component={ResetPasswordMailSent} />
          <Route path="/login" exact component={Login} />
          <Route path="/" exact component={Home} />
          <Route path="*" component={NotFound} />
        </Switch>
        <ToastContainerWrapper />
      </BrowserRouter>
    </div>
  );
}

export default App;
