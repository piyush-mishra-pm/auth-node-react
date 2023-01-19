import React, {SyntheticEvent, useState} from 'react';
import apiWrapper from '../apis/apiWrapper';
import {Redirect, Link} from 'react-router-dom';

function Login({setLoggedInStatus, loggedInUser}: {setLoggedInStatus: Function; loggedInUser: any}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  async function onSubmitHandler(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const response = await apiWrapper.post('/login', {
        email,
        password,
      });
      if (response.status >= 400) {
        setResponseMessage(response.data);
      } else setResponseMessage(null);

      // Redirect, when sussessfully logged in:
      setRedirect(true);
      setLoggedInStatus();
    } catch (e: any) {
      setResponseMessage(e.response.data);
    }
  }

  if (redirect || loggedInUser) {
    return <Redirect to="/" />;
  }

  function renderForm() {
    return (
      <div className="ui container" style={{width: '50%'}}>
        <h1>Login</h1>
        <form className="ui form" onSubmit={onSubmitHandler}>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              required
              name="email"
              placeholder="Email ID"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              required
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="ui button" type="submit">
            Submit
          </button>
        </form>
        <Link to="/forgot">
          <p>Forgot password?</p>
        </Link>
        <br />
        <Link to="/register">
          <p>Register instead?</p>
        </Link>
        {responseMessage && (
          <div className="ui warning message">
            <i className="warning icon"></i>
            {responseMessage}
          </div>
        )}
      </div>
    );
  }
  return renderForm();
}

export default Login;
