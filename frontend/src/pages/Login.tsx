import React, {SyntheticEvent, useState, useRef} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';

import apiWrapper from '../apis/apiWrapper';
import ACTION_TYPES from '../store/actions/ACTION_TYPES';
import {useUserDispatcher, useAuthDispatcher, useUiDispatcher} from '../store/actions/DISPATCH_HOOK_REGISTRY';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState(null);
  const recaptchaRef: any = useRef(null);

  const userDispatcher = useUserDispatcher();
  const authDispatcher = useAuthDispatcher();
  const uiDispatcher = useUiDispatcher();

  const history = useHistory();

  async function onSubmitHandler(e: SyntheticEvent) {
    e.preventDefault();
    try {
      uiDispatcher(ACTION_TYPES.UI.SET_LOADING_SPINNER_STATE, {isLoading: true});

      const captchaToken = recaptchaRef.current.getValue();
      recaptchaRef.current.reset();

      const response = await apiWrapper.post('/login', {
        email,
        password,
        captcha: captchaToken,
      });
      if (response.status >= 400) {
        authDispatcher(ACTION_TYPES.AUTH.SIGN_OUT, undefined);
        userDispatcher(ACTION_TYPES.USER.RESET_PII, undefined);
        setResponseMessage(response.data.message);
      } else setResponseMessage(null);

      authDispatcher(ACTION_TYPES.AUTH.SIGN_IN, {userId: response.data.data.userId, jwt: response.data.data.jwt});
      userDispatcher(ACTION_TYPES.USER.FILL_PII, {
        first_name: response.data.data.first_name,
        last_name: response.data.data.last_name,
        email: response.data.data.email,
      });
      uiDispatcher(ACTION_TYPES.UI.SET_LOADING_SPINNER_STATE, {isLoading: false});
      history.push('/');
    } catch (e: any) {
      authDispatcher(ACTION_TYPES.AUTH.SIGN_OUT, undefined);
      setResponseMessage(e.response.data.message);
      userDispatcher(ACTION_TYPES.USER.RESET_PII, undefined);
    }
    uiDispatcher(ACTION_TYPES.UI.SET_LOADING_SPINNER_STATE, {isLoading: false});
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
        <ReCAPTCHA ref={recaptchaRef} sitekey="6LdbU-QjAAAAAAjBAVr0hySl-CSxLyhIfp0evc21" />
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

export default Login;
