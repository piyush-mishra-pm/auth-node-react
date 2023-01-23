import React, {useState, SyntheticEvent} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {toast} from 'react-toastify';
import apiWrapper from '../apis/apiWrapper';
import ACTION_TYPES from '../store/actions/ACTION_TYPES';
import {useUiDispatcher} from '../store/actions/DISPATCH_HOOK_REGISTRY';

function ResetPassword({match}: {match: any}) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [notification, setNotification] = useState({show: false, error: false, message: ''});
  const history = useHistory();
  const uiDispatcher = useUiDispatcher();

  async function onSubmitHandler(e: SyntheticEvent) {
    e.preventDefault();
    try {
      uiDispatcher(ACTION_TYPES.UI.SET_LOADING_SPINNER_STATE, {isLoading: true});
      const token = match.params.token;
      await apiWrapper.post('/reset', {password, token, password_confirm: passwordConfirm});
      setNotification({show: true, error: false, message: `Password successfully reset. Try Logging in!`});
      uiDispatcher(ACTION_TYPES.UI.SET_LOADING_SPINNER_STATE, {isLoading: false});
      history.push('/login');
    } catch (e) {
      setNotification({show: true, error: true, message: 'Problem occured!'});
    }
    uiDispatcher(ACTION_TYPES.UI.SET_LOADING_SPINNER_STATE, {isLoading: false});
  }

  function renderForm() {
    return (
      <div>
        <div className="ui container" style={{width: '50%'}}>
          <h1>Reset Password</h1>
          <form className="ui form" onSubmit={onSubmitHandler}>
            <div className="field">
              <label>New Password</label>
              <input
                type="password"
                required
                name="password"
                value={password}
                placeholder="New Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Confirm New Password</label>
              <input
                type="password"
                required
                name="password_confirm"
                value={passwordConfirm}
                placeholder="Confirm New Password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
              />
            </div>
            <button className="ui button" type="submit">
              Set New Password
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

  if (notification.message) {
    toast(notification.message, {
      type: notification.error ? 'error' : 'success',
      toastId: 'Reset-Password',
    });
  }

  return renderForm();
}

export default ResetPassword;
