import React, {useState, SyntheticEvent} from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

// todo: control 'active' tab, depending upon which screen is current screen.
function HeaderNav({loggedInUser, setLoggedInStatus}: {loggedInUser: any; setLoggedInStatus: Function}) {
  async function onLogoutClickHandler(e: SyntheticEvent) {
    e.preventDefault();
    try {
      await axios.post('/logout', {});
      setLoggedInStatus();
    } catch (err) {
      console.error('Error while logging out:', err);
      //todo: Logout if err? setLoggedInStatus();
    }
  }

  return (
    <div className="ui borderless huge menu">
      <Link to="/" className="ui header item">
        Auth-React-Node
      </Link>
      <div className="menu right">
        {!loggedInUser && (
          <div className="item">
            <Link className="ui positive button" to="/register">
              Register
            </Link>
          </div>
        )}
        {!loggedInUser && (
          <div className="item">
            <Link className="ui positive button" to="/login">
              Login
            </Link>
          </div>
        )}
        {loggedInUser && (
          <div className="item">
            <Link className="ui negative button" to="/" onClick={onLogoutClickHandler}>
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeaderNav;
