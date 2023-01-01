import axios from 'axios';
import React, {SyntheticEvent, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';

function RegisterForm() {
  // Creating State objects:
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function formSubmitHandler(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const response = await axios.post('/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirm: passwordConfirm,
      });
      if (response.status >= 400) {
        setResponseMessage(response.data);
        throw Error(response.data);
      } else setResponseMessage(null);

      // Redirect, when sussessfully logged in:
      setRedirect(true);
    } catch (e: any) {
      setResponseMessage(e.response.data);
    }
  }

  function renderForm() {
    return (
      <div className="ui container" style={{width: '50%'}}>
        <h1>Register</h1>
        <form className="ui form" onSubmit={formSubmitHandler}>
          <div className="field required">
            <label>First Name</label>
            <input
              type="text"
              required
              name="firstName"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="field">
            <label>Last Name</label>
            <input type="text" name="lastName" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
          </div>
          <div className="field required">
            <label>Email</label>
            <input
              type="email"
              required
              name="email"
              placeholder="Email ID"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field required">
            <label>Password</label>
            <input
              type="password"
              required
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="field required">
            <label>Confirm Password</label>
            <input
              type="password"
              name="passwordConfirm"
              required
              placeholder="Confirm Password"
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
          <button className="ui button" type="submit">
            Submit
          </button>
        </form>
        <Link to="/login">Login instead?</Link>
        {responseMessage && (
          <div className="ui warning message">
            <i className="warning icon"></i>
            {responseMessage}
          </div>
        )}
      </div>
    );
  }

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return renderForm();
}

export default RegisterForm;
