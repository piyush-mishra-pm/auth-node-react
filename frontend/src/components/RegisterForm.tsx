import React from 'react';

function RegisterForm() {
  return (
    <div className="ui container" style={{width: '50%'}}>
      <h1>Register</h1>
      <form className="ui form">
        <div className="field">
          <label>First Name</label>
          <input type="text" name="firstName" placeholder="First Name" />
        </div>
        <div className="field">
          <label>Last Name</label>
          <input type="text" name="lastName" placeholder="Last Name" />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="text" name="email" placeholder="Email ID" />
        </div>
        <div className="field">
          <label>Password</label>
          <input type="text" name="password" placeholder="Password" />
        </div>
        <div className="field">
          <label>Confirm Password</label>
          <input type="text" name="passwordConfirm" placeholder="Confirm Password" />
        </div>
        <button className="ui button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;
