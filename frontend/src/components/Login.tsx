import React, {SyntheticEvent, useState} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

  async function onSubmitHandler(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const response = await axios.post('/login', {
        email,
        password,
      });
      if (response.status >= 400) {
        setResponseMessage(response.data);
      } else setResponseMessage(null);

      // Redirect, when sussessfully logged in:
      setRedirect(true);

      console.log(response.data);
    } catch (e: any) {
      console.log(e.response.data);
      setResponseMessage(e.response.data);
    }
  }

  if (redirect) {
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
