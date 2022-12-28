import React from 'react';
import {Link} from 'react-router-dom';

// todo: control 'active' tab, depending upon which screen is current screen.
function HeaderNav() {
  return (
    <div className="ui borderless huge menu">
      <Link to="/" className="ui header item">
        Auth-React-Node
      </Link>
      <div className="menu right">
        <div className="item">
          <Link className="ui positive button" to="/register">
            Register
          </Link>
        </div>
        <div className="item">
          <Link className="ui positive button" to="/login">
            Login
          </Link>
        </div>
        <div className="item">
          <Link className="ui negative button" to="/logout">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeaderNav;
