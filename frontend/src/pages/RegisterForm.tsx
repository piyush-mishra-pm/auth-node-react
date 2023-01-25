import React, {SyntheticEvent, useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import {toast} from 'react-toastify';

import apiWrapper from '../apis/apiWrapper';
import {useUiDispatcher} from '../store/actions/DISPATCH_HOOK_REGISTRY';
import ACTION_TYPES from '../store/actions/ACTION_TYPES';
import OAuth from '../components/OAuth';

function RegisterForm() {
  // Creating State objects:
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);
  const recaptchaRef: any = useRef(null);
  const history = useHistory();
  const uiDispatcher = useUiDispatcher();

  async function formSubmitHandler(e: SyntheticEvent) {
    e.preventDefault();
    try {
      uiDispatcher(ACTION_TYPES.UI.SET_LOADING_SPINNER_STATE, {isLoading: true});

      // Get Captcha and then reset Captcha.
      const captchaToken = recaptchaRef.current.getValue();
      recaptchaRef.current.reset();

      const response = await apiWrapper.post('/register', {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        password_confirm: passwordConfirm,
        captcha: captchaToken,
      });
      if (response.status >= 400) {
        setResponseMessage(response.data.message);
        throw Error(response.data.message);
      } else setResponseMessage(null);

      // Redirect, when sussessfully logged in:
      uiDispatcher(ACTION_TYPES.UI.SET_LOADING_SPINNER_STATE, {isLoading: false});
      history.push('/login');
    } catch (e: any) {
      setResponseMessage(e.response.data.message);
    }
    uiDispatcher(ACTION_TYPES.UI.SET_LOADING_SPINNER_STATE, {isLoading: false});
  }

  function renderForm() {
    return (
      <div className="ui container" style={{width: '50%'}}>
        <OAuth />
        <hr />
        <h2>... or register below</h2>
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
          <ReCAPTCHA ref={recaptchaRef} sitekey="6LdbU-QjAAAAAAjBAVr0hySl-CSxLyhIfp0evc21" />
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

  if (responseMessage) {
    toast(responseMessage, {
      type: 'error',
      toastId: 'Login-Toast',
    });
  }

  return renderForm();
}

export default RegisterForm;
