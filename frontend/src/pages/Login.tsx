import React, {SyntheticEvent, useState, useRef} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import ReCAPTCHA from 'react-google-recaptcha';

import ACTION_TYPES from '../store/actions/ACTION_TYPES';
import {useUserDispatcher, useAuthDispatcher} from '../store/actions/DISPATCH_HOOK_REGISTRY';
import OAuth from '../components/OAuth';
import {useHttpClient} from '../hooks/httpHook';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorModal from '../components/ErrorModal';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const recaptchaRef: any = useRef(null);
  const {isLoading, error, sendRequest, clearErrorHandler} = useHttpClient();
  const userDispatcher = useUserDispatcher();
  const authDispatcher = useAuthDispatcher();

  const history = useHistory();

  async function onSubmitHandler(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const captchaToken = recaptchaRef.current.getValue();
      recaptchaRef.current.reset();

      const response = await sendRequest({
        successMessage: 'Login successful!',
        url: '/login',
        method: 'POST',
        body: {
          email,
          password,
          captcha: captchaToken,
        },
      });
      authDispatcher(ACTION_TYPES.AUTH.SIGN_IN, {userId: response.data.userId, jwt: response.data.jwt});
      userDispatcher(ACTION_TYPES.USER.FILL_PII, {
        first_name: response.data.first_name,
        last_name: response.data.last_name,
        email: response.data.email,
      });
      history.push('/');
    } catch (e: any) {
      authDispatcher(ACTION_TYPES.AUTH.SIGN_OUT, undefined);
      userDispatcher(ACTION_TYPES.USER.RESET_PII, undefined);
    }
  }

  function renderForm() {
    return (
      <div className="ui container" style={{width: '50%'}}>
        <OAuth />
        <hr />
        <h2>... Or Login below</h2>
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
        <br />
        <ReCAPTCHA ref={recaptchaRef} sitekey={`${process.env.RECAPTCHA_KEYS}`} />
        <hr />
        {error && (
          <div className="ui warning message">
            <i className="warning icon"></i>
            {error}
          </div>
        )}
        <Link to="/forgot">
          <p>Forgot password?</p>
        </Link>
        <br />
        <Link to="/register">
          <p>Register instead?</p>
        </Link>
        <br />
      </div>
    );
  }

  if (error) {
    toast(error, {
      type: 'error',
      toastId: 'Login-Toast',
    });
  }

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner />}
      {error && <ErrorModal onCloseModal={clearErrorHandler} header={'Login error'} content={error} />}
      {renderForm()}
    </React.Fragment>
  );
}

export default Login;
