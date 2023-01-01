import React, {useState, SyntheticEvent} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

function ResetPassword({match}: {match: any}) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [notification, setNotification] = useState({show: false, error: false, message: ''});

  async function onSubmitHandler(e: SyntheticEvent) {
    e.preventDefault();
    try {
      const token = match.params.token;
      await axios.post('/reset', {password, token, password_confirm: passwordConfirm});
      setNotification({show: true, error: false, message: `Password successfully reset. Try Logging in!`});
      setRedirect(true);
    } catch (e) {
      setNotification({show: true, error: true, message: 'Problem occured!'});
    }
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

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return renderForm();
}

export default ResetPassword;
