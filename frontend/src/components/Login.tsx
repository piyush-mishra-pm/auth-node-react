import React from 'react';

function Login() {
  return (
    <div className="ui container" style={{width: '50%'}}>
      <h1>Login</h1>
      <form className="ui form">
        <div className="field">
          <label>Email</label>
          <input type="text" name="email" placeholder="Email ID" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="text" name="password" placeholder="Password" />
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Login;
