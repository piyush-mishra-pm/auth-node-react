import React, {SyntheticEvent, useCallback} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';

import apiWrapper from '../apis/apiWrapper';
import ACTION_TYPES from '../store/actions/ACTION_TYPES';
import {AUTH_PAYLOAD} from '../store/PAYLOAD_DEFINITIONS';
import {AUTH_STATE, STATE} from '../store/STATE_DEFINITIONS';

// todo: control 'active' tab, depending upon which screen is current screen.
function HeaderNav() {
  const authState: AUTH_STATE = useSelector((state: STATE) => state.auth);
  const dispatch = useDispatch();
  const logoutDispatcher = useCallback(
    (type: string, payload: AUTH_PAYLOAD | undefined) => dispatch({type, payload}),
    [dispatch]
  );

  async function onLogoutClickHandler(e: SyntheticEvent) {
    e.preventDefault();
    try {
      await apiWrapper.post('/logout', {});
    } catch (err) {
      console.error('Error while logging out:', err);
    }
    logoutDispatcher(ACTION_TYPES.SIGN_OUT, undefined);
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
