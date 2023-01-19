import React, {SyntheticEvent, useState} from 'react';
import {Link} from 'react-router-dom';
import apiWrapper from '../apis/apiWrapper';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [notification, setNotification] = useState({show: false, error: false, message: ''});

  async function onSubmitHandler(e: SyntheticEvent) {
    e.preventDefault();
    try {
      await apiWrapper.post('/forgot', {email});
      setNotification({show: true, error: false, message: `Please Check the Email: ${email}`});
      setEmail('');
    } catch (e) {
      setNotification({show: true, error: true, message: 'Problem occured! Is this email registered'});
    }
  }

  function renderForm() {
    return (
      <div>
        <div className="ui container" style={{width: '50%'}}>
          <h1>Forgot Password Page</h1>
          <form className="ui form" onSubmit={onSubmitHandler}>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                required
                name="email"
                value={email}
                placeholder="Email ID"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button className="ui button" type="submit">
              Send Reset Password Link to Email
            </button>
          </form>
          <Link to="/login">
            <p>Login instead?</p>
          </Link>
          <br />
          <Link to="/register">
            <p>Register instead?</p>
          </Link>
          {notification.show && (
            <div className={`ui ${notification.error ? 'warning' : 'positive'} message`}>
              <i className={`${notification.error ? 'warning' : 'positive'} icon`}></i>
              {notification.message}
            </div>
          )}
        </div>
      </div>
    );
  }
  return renderForm();
}

export default ForgotPassword;
