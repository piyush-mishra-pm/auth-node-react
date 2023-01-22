import React, {SyntheticEvent} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import apiWrapper from '../apis/apiWrapper';
import ACTION_TYPES from '../store/actions/ACTION_TYPES';
import {AUTH_STATE, STATE} from '../store/STATE_DEFINITIONS';
import {useUserDispatcher, useAuthDispatcher} from '../store/actions/DISPATCH_HOOK_REGISTRY';

// todo: control 'active' tab, depending upon which screen is current screen.
function HeaderNav() {
  const authState: AUTH_STATE = useSelector((state: STATE) => state.auth);
  const userDispatcher = useUserDispatcher();
  const authDispatcher = useAuthDispatcher();

  async function onLogoutClickHandler(e: SyntheticEvent) {
    e.preventDefault();
    try {
      await apiWrapper.post('/logout', {});
    } catch (err) {
      console.error('Error while logging out:', err);
    }
    userDispatcher(ACTION_TYPES.USER.RESET_PII, undefined);
    authDispatcher(ACTION_TYPES.AUTH.SIGN_OUT, undefined);
  }

  const loggedInUser = authState.isSignedIn;

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
