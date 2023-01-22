import React, {SyntheticEvent, useState, useCallback} from 'react';
import apiWrapper from '../apis/apiWrapper';
import {Redirect, Link} from 'react-router-dom';
import {toast} from 'react-toastify';
import {useSelector, useDispatch} from 'react-redux';
import ACTION_TYPES from '../store/actions/ACTION_TYPES';
import {AUTH_PAYLOAD} from '../store/PAYLOAD_DEFINITIONS';
import {AUTH_STATE, STATE} from '../store/STATE_DEFINITIONS';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);
  const authState: AUTH_STATE = useSelector((state: STATE) => state.auth);
  const dispatch = useDispatch();
  const loginDispatcher = useCallback(
    (type: string, payload: AUTH_PAYLOAD | undefined) => dispatch({type, payload}),
    [dispatch]
  );

  async function onSubmitHandler(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const response = await apiWrapper.post('/login', {
        email,
        password,
      });
      if (response.status >= 400) {
        loginDispatcher(ACTION_TYPES.SIGN_OUT, undefined);
        setResponseMessage(response.data.message);
      } else setResponseMessage(null);

      // Redirect, when sussessfully logged in:
      setRedirect(true);
      loginDispatcher(ACTION_TYPES.SIGN_IN, {userId: response.data.data.userId, jwt: response.data.data.jwt});
    } catch (e: any) {
      loginDispatcher(ACTION_TYPES.SIGN_OUT, undefined);
      setResponseMessage(e.response.data.message);
    }
  }

  if (redirect || authState.isSignedIn) {
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

  if (responseMessage) {
    toast(responseMessage, {
      type: 'error',
      toastId: 'Login-Toast',
    });
  }

  return renderForm();
}

export default Login;
